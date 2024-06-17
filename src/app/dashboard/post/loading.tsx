import { SkeletonCard } from "@/app/components/SkeletonCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-5">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>
      <div className="grid grid-cols-4 mt-6 gap-5">
        {"abcd".split("").map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </>
  );
}
