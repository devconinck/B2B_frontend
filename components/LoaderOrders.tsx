import { Skeleton } from "@/components/ui/skeleton";

export function LoaderOrders() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between space-y-2 mb-5">
        <Skeleton className="h-5 w-[400px]" />
      </div>
      <div className="flex items-center py-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px] ml-2" />
      </div>
      <div className="rounded-md">
        <Skeleton className="h-[500px] w-[1340px] rounded-md border" />
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <Skeleton className="h-4 w-[750px]" />
        </div>
      </div>
    </div>
  );
}
