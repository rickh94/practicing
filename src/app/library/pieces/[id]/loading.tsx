import {
  BreadcrumbSkeleton,
  PieceInfoSkeleton,
  shimmer,
} from "~/app/_components/skeletons";

export default function Loading() {
  return (
    <>
      <div className="-mb-2 flex items-center justify-center">
        <div
          className={`my-2 h-10 w-52 bg-neutral-800/40 sm:w-64 ${shimmer}`}
        />
      </div>
      <div className="flex w-full items-center justify-start sm:container">
        <BreadcrumbSkeleton size={3} />
      </div>
      <div className="relative grid w-full grid-cols-1 gap-x-2 gap-y-4 sm:max-w-5xl md:grid-cols-2">
        <PieceInfoSkeleton />
      </div>
    </>
  );
}
