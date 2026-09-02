import { PLACE_LOGO } from "../brand"

export function MissingView() {
  return <ErrorStand title="Page not found" copy="This site is not available." />
}

export function PaywallView() {
  return (
    <ErrorStand
      title="This site is paused"
      copy="The trial has ended. The distributor needs to subscribe to keep the site live."
    />
  )
}

export function ErrorStand({
  title,
  copy,
  onRetry,
}: {
  title: string
  copy: string
  onRetry?: () => void
}) {
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
        <img
          src={PLACE_LOGO}
          alt="Advisorkhoj"
          style={{ height: 40, width: "auto", margin: "0 auto 0.85rem", display: "block" }}
        />
        <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.4rem", letterSpacing: "-0.03em" }}>{title}</h1>
        <p style={{ margin: 0, color: "#57534e", lineHeight: 1.5 }}>{copy}</p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            style={{
              marginTop: "1.15rem",
              border: 0,
              borderRadius: 999,
              padding: "0.5rem 1rem",
              background: "#1c1917",
              color: "#fff",
              font: "inherit",
              fontSize: "0.84rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        ) : null}
      </div>
    </div>
  )
}
