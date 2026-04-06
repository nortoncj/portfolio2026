import React from 'react'
import Image from 'next/image'

export default function Proof({brands}: {brands: {name: string, logo: string, style?: string}[] }) {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-24">
      {/* Glass Panel Card */}
      <div
        className="relative overflow-hidden"
        style={{
          // background: "rgba(16, 13, 17, 0.5)",
          // backdropFilter: "blur(24px)",
          borderRadius: "2rem",
          border: "1px solid rgba(255, 139, 162, 0.15)",
          boxShadow: `
            0 0 1px rgba(255, 139, 162, 0.1) inset,
            0 40px 80px rgba(255, 139, 162, 0.08)
          `,
          marginBottom: "4rem",
          padding: "4rem 3rem",
        }}
      >
        {/* Gradient Signature Texture - Background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #ff8ba2 0%, #f85c83 100%)",
            mixBlendMode: "overlay",
          }}
        />

        {/* Content Container */}
        <div className="relative  text-center space-y-8">
          {/* Label - Technical Metadata */}
          <div
            className="uppercase tracking-[0.2em] font-semibold"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.75rem",
              color: "#ff8ba2",
              letterSpacing: "0.2em",
            }}
          >
            Validated Excellence
          </div>

          {/* Display Headline - Editorial Impact */}
          <h3
            className="font-bold leading-tight"
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              background: "linear-gradient(135deg, #ffe6a6 0%, #ff8ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}
          >
            {/* Systems Engineered For */}
            Engineering Systems For{" "}
            <span className="grad">Real-World Impact</span>
          </h3>

          {/* Brand Icons Grid */}
          <div
            className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center pt-8"
            style={{
              marginTop: "3.5rem",
            }}
          >
            {brands.map((brand, index) => (
              <div
                key={index}
                className="group relative flex items-center justify-center transition-all duration-500 hover:scale-110"
                style={{
                  filter: "grayscale(100%) brightness(0.4)",
                  transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  borderRadius: "1rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter =
                    "grayscale(0%) brightness(1) drop-shadow(0 0 8px rgba(255, 139, 162, 0.6)) ";
                  e.currentTarget.style.backgroundColor =
                    brand.style || "transparent";
                  e.currentTarget.style.padding = "20px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter =
                    "grayscale(100%) brightness(0.4)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {/* Ambient Glow on Hover */}
                <div
                  className="absolute inset-0 place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(142, 242, 254, 0.3) 0%, transparent 70%)",
                    transform: "scale(1.5)",
                  }}
                />

                <Image
                  src={brand.logo as string}
                  width={80}
                  height={80}
                  alt={brand.name as string}
                  className="relative z-10"
                  style={{
                    maxWidth: "80px",
                    height: "auto",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Ghost Border Inner Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: "2rem",
            boxShadow: "0 0 0 1px rgba(255, 139, 162, 0.1) inset",
          }}
        />
      </div>
    </div>
  );
}
