import { PieceListSkeleton } from "~/app/_components/skeletons";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
          Your Pieces
        </h1>
      </div>
      <PieceListSkeleton />
    </>
  );
}
