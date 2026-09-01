export const metadata = {
  title: "Disclosures",
}

export default function DisclosuresPage() {
  return (
    <main style={{ maxWidth: 640, margin: "4rem auto", padding: "0 1.25rem", lineHeight: 1.6 }}>
      <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 500 }}>Commission disclosures</h1>
      <p>
        This distributor may receive commission from AMCs as permitted by SEBI / AMFI. Details are
        available on request and will be published here when the live site is connected to the MFD’s
        ARN.
      </p>
      <p>
        Mutual fund investments are subject to market risks, read all scheme related documents
        carefully.
      </p>
      <p>
        <a href="/">Back</a>
      </p>
    </main>
  )
}
