import { PieceInfoSkeleton, shimmer } from "~/app/_components/skeletons";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className={`h-12 w-52 bg-neutral-800/40 sm:w-64 ${shimmer}`} />
      </div>
      <div className="relative grid w-full grid-cols-1 gap-x-2 gap-y-4 sm:max-w-5xl md:grid-cols-2">
        <PieceInfoSkeleton />
      </div>
    </>
  );
}
