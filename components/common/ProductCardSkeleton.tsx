export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="w-full aspect-video bg-gray-200" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-5 w-2/3 rounded bg-gray-200"></div>
        <div className="h-5 w-1/2 rounded bg-gray-200"></div>
        <div className="h-4 w-1/3 rounded bg-gray-200"></div>
        <div className="h-4 w-1/4 rounded bg-gray-200"></div>
        <div className="h-6 w-1/4 rounded bg-gray-200"></div>
        <div className="mt-4 h-10 w-full rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
