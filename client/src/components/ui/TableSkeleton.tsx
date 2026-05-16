export const TableSkeleton = () => (
  <div className="animate-pulse space-y-3 mt-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="h-12 rounded-lg bg-gray-200" />
    ))}
  </div>
);
