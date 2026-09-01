export function MissingView() {
  return (
    <GenericStand
      title="Page not found"
      copy="This site is not available."
    />
  )
}

export function PaywallView() {
  return (
    <GenericStand
      title="This site is paused"
      copy="The trial has ended. The distributor needs to subscribe to keep the site live."
    />
  )
}

function GenericStand({ title, copy }: { title: string; copy: string }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        background: "#f6f4ef",
        color: "#1c1917",
      }}
    >
      <div style={{ maxWidth: 420, textAlign: "center" }}>
        <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.4rem", letterSpacing: "-0.03em" }}>{title}</h1>
        <p style={{ margin: 0, color: "#57534e", lineHeight: 1.5 }}>{copy}</p>
      </div>
    </div>
  )
}
