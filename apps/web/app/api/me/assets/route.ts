import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { json, requireSession } from "@/lib/auth"

export const runtime = "nodejs"

const KINDS = ["logo", "photo", "hero"] as const
type Kind = (typeof KINDS)[number]
const MAX = 4 * 1024 * 1024

function extOf(name: string, type: string) {
  const fromName = name.split(".").pop()?.toLowerCase()
  if (fromName && ["jpg", "jpeg", "png", "webp", "gif"].includes(fromName)) return fromName === "jpeg" ? "jpg" : fromName
  if (type === "image/png") return "png"
  if (type === "image/webp") return "webp"
  if (type === "image/gif") return "gif"
  return "jpg"
}

async function uploadS3(key: string, body: Buffer, contentType: string) {
  const bucket = process.env.S3_BUCKET
  if (!bucket) return null
  const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3")
  const client = new S3Client({
    region: process.env.S3_REGION || "auto",
    endpoint: process.env.S3_ENDPOINT || undefined,
    credentials:
      process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          }
        : undefined,
  })
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  )
  const base = (process.env.S3_PUBLIC_BASE || "").replace(/\/$/, "")
  if (!base) throw new Error("S3_PUBLIC_BASE is not set")
  return `${base}/${key}`
}

export async function POST(req: Request) {
  const { session, error } = await requireSession()
  if (error || !session) return error!

  const form = await req.formData()
  const file = form.get("file")
  const kind = String(form.get("kind") || "") as Kind
  if (!(file instanceof File)) return json({ error: "no_file" }, 400)
  if (!KINDS.includes(kind)) return json({ error: "bad_kind" }, 400)
  if (file.size > MAX) return json({ error: "too_large" }, 400)
  if (!file.type.startsWith("image/")) return json({ error: "not_image" }, 400)

  const ext = extOf(file.name, file.type)
  const filename = `${kind}-${Date.now()}.${ext}`
  const key = `mfd/${session.tenantId}/${filename}`
  const buf = Buffer.from(await file.arrayBuffer())

  try {
    const remote = await uploadS3(key, buf, file.type)
    if (remote) return json({ url: remote, kind })
  } catch (err) {
    console.error("[assets] s3", err)
    return json({ error: "upload_failed" }, 502)
  }

  const dir = path.join(process.cwd(), "public", "uploads", String(session.tenantId))
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, filename), buf)
  return json({ url: `/uploads/${session.tenantId}/${filename}`, kind })
}
