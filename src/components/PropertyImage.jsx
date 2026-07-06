import PropertyArt from "./PropertyArt";

export default function PropertyImage({
  image,
  art,
  label,
  className = "",
}) {
  if (!image) {
    return (
      <PropertyArt
        variant={art?.variant || "dusk"}
        seed={art?.seed ?? 1}
        className={className}
        label={label}
      />
    );
  }

  return (
    <img
      src={image}
      alt={label}
      className={`object-cover ${className}`}
      onError={(e) => {
        console.error("Failed image:", e.target.src);
      }}
    />
  );
}