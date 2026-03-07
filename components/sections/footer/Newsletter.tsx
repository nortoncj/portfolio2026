"use client";
import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubState("loading");
    // Replace with your real API call / Resend / Mailchimp integration
    setTimeout(() => setSubState("done"), 1200);
  };
  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        borderBottom: "1px solid rgba(255,255,255,.07)",
        padding: "3rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {/* Copy */}
        <div style={{ maxWidth: 460 }}>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#ff6188",
              marginBottom: "0.5rem",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            📬 Newsletter
          </p>
          <h3
            style={{
              fontSize: "clamp(1.2rem, 3vw, 1.55rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              marginBottom: "0.5rem",
              color: "#fcfcfa",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            Systems, code & the craft of building.
          </h3>
          <p
            style={{
              fontSize: "0.88rem",
              color: "rgba(252,252,250,.55)",
              lineHeight: 1.6,
            }}
          >
            No fluff. Real engineering insights, project breakdowns, and tools I
            actually use — straight to your inbox.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubscribe}
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            flex: "1 1 340px",
            maxWidth: 480,
          }}
        >
          {subState === "done" ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 20px",
                borderRadius: 12,
                background: "rgba(169,220,118,.15)",
                border: "1px solid rgba(169,220,118,.35)",
                color: "#a9dc76",
                fontSize: "0.9rem",
                fontWeight: 600,
                width: "100%",
              }}
            >
              <span>✓</span> You're in! Watch your inbox.
            </div>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                aria-label="Email address for newsletter"
                style={{
                  flex: "1 1 200px",
                  padding: "12px 18px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,.14)",
                  background: "rgba(255,255,255,.07)",
                  color: "#fcfcfa",
                  fontSize: "0.9rem",
                  outline: "none",
                  backdropFilter: "blur(8px)",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  fontFamily: "'Inter', sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#ff6188";
                  e.target.style.boxShadow = "0 0 0 3px rgba(255,97,136,.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,.14)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="submit"
                disabled={subState === "loading"}
                className="btn-primary"
                style={{
                  padding: "12px 24px",
                  borderRadius: 12,
                  border: "none",
                  background:
                    "linear-gradient(135deg,#ff6188 0%,#fc5fa3 50%,#ab9df2 100%)",
                  color: "#fcfcfa",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: subState === "loading" ? "wait" : "pointer",
                  whiteSpace: "nowrap",
                  opacity: subState === "loading" ? 0.7 : 1,
                  transition: "opacity 0.2s, transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 18px rgba(255,97,136,.35)",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (subState !== "loading") {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateY(-1px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 8px 28px rgba(255,97,136,.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "none";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 4px 18px rgba(255,97,136,.35)";
                }}
              >
                {subState === "loading" ? "Subscribing…" : "Subscribe →"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
