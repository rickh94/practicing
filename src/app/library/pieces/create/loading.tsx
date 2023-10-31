import {
  BreadcrumbSkeleton,
  PieceFormSkeleton,
} from "~/app/_components/skeletons";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
          Create Piece
        </h1>
      </div>
      <div className="-mb-4 flex w-full items-center justify-start sm:container">
        <BreadcrumbSkeleton size={3} />
      </div>
      <div className="w-full sm:max-w-5xl">
        <PieceFormSkeleton />
      </div>
    </>
  );
}
