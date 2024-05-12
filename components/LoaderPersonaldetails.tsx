import { Skeleton } from "@/components/ui/skeleton";

export function LoaderPersonaldetails() {
  return (
    <div className="flex flex-col min-h-[25dvh]">
      <div className="flex items-center justify-center mt-10 mb-3">
        <Skeleton className="w-full h-40" />
      </div>
    </div>
  );
}
