export default function CardGridSkeleton({ count = 6, className = "" }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-hairline bg-card overflow-hidden animate-pulse">
          <div className="h-64 bg-surface-2" />
          <div className="p-6 space-y-3">
            <div className="h-5 w-2/3 bg-surface-2 rounded-sm" />
            <div className="h-3 w-1/2 bg-surface-2 rounded-sm" />
            <div className="h-px w-full bg-hairline mt-5" />
            <div className="h-4 w-1/3 bg-surface-2 rounded-sm mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}
