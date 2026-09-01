import { AdminApp } from "./AdminApp"

export const metadata = {
  title: "Ops",
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminApp />
}
