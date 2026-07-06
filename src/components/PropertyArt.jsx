// Generative SVG "photography" placeholders.
// Swap these for real listing photography in production —
// see README "Replacing imagery" section.

const palettes = {
  dusk: ["#1b2a3f", "#2c4561", "#0d1622"],
  noon: ["#3a5a78", "#7fa8bd", "#0f1a26"],
  emerald: ["#1c3328", "#2f5240", "#0c1812"],
  amber: ["#3d2f1d", "#6b4f2a", "#140f08"],
  night: ["#0c1320", "#1a2638", "#05080d"],
  rose: ["#3a2430", "#5c3a45", "#150d12"],
};

function Skyline({ seed = 0 }) {
  // deterministic pseudo-random building heights from seed
  const rand = (n) => {
    const x = Math.sin(seed * 999 + n * 13.7) * 10000;
    return x - Math.floor(x);
  };
  const bars = Array.from({ length: 14 }, (_, i) => {
    const h = 20 + rand(i) * 70;
    return { x: i * 36, h };
  });
  return (
    <g opacity="0.5">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={160 - b.h} width="26" height={b.h} fill="#0a0d13" opacity="0.55" />
      ))}
    </g>
  );
}

export default function PropertyArt({ variant = "dusk", seed = 1, className = "", label }) {
  const [c1, c2, c3] = palettes[variant] || palettes.dusk;
  const gradId = `grad-${variant}-${seed}`;
  const glowId = `glow-${variant}-${seed}`;

  return (
    <svg
      viewBox="0 0 640 480"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={label || "Property image placeholder"}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="55%" stopColor={c2} />
          <stop offset="100%" stopColor={c3} />
        </linearGradient>
        <radialGradient id={glowId} cx="70%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="480" fill={`url(#${gradId})`} />
      <rect width="640" height="480" fill={`url(#${glowId})`} />
      <g transform="translate(0,260)">
        <Skyline seed={seed} />
      </g>
      {/* horizon line */}
      <line x1="0" y1="300" x2="640" y2="300" stroke="#c9a84c" strokeOpacity="0.15" strokeWidth="1" />
      {/* subtle grid texture */}
      <g opacity="0.06" stroke="#ece6da" strokeWidth="1">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 60} x2="640" y2={i * 60} />
        ))}
      </g>
    </svg>
  );
}
