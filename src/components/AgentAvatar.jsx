import { useState } from "react";

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("");
}

/**
 * Shows a real headshot if `image` loads successfully. Falls back to a
 * gold monogram circle (initials) if no image is given, or if it fails
 * to load — never shows a broken-image icon.
 */
export default function AgentAvatar({ image, name, className = "" }) {
  const [failed, setFailed] = useState(false);
  const showImage = image && !failed;

  if (showImage) {
    return (
      <img
        src={image}
        alt={name}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`w-36 h-36 rounded-full bg-gradient-to-br from-hairline to-surface flex items-center justify-center ${className}`}
    >
      <span className="font-display text-4xl text-gold">{initials(name)}</span>
    </div>
  );
}
