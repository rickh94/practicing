import {
  BreadcrumbSkeleton,
  PieceListSkeleton,
} from "~/app/_components/skeletons";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
          Your Pieces
        </h1>
      </div>

      <div className="flex w-full items-center justify-between">
        <BreadcrumbSkeleton size={2} />
        <div className="focusable flex h-12 w-32 items-center justify-center rounded-xl bg-emerald-700/10 px-6 py-3 text-center font-medium text-emerald-700 hover:bg-emerald-700/20"></div>
      </div>
      <PieceListSkeleton />
    </>
  );
}
