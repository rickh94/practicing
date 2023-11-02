import {
  BreadcrumbContainer,
  TwoColumnPageContainer,
} from "~/app/_components/containers";
import {
  BreadcrumbSkeleton,
  PieceInfoSkeleton,
  PieceSpotsSkeleton,
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
      <BreadcrumbContainer>
        <BreadcrumbSkeleton size={3} />
        <div className="flex justify-end gap-2">
          <div className="focusable flex h-10 w-28 items-center justify-center rounded-xl bg-yellow-700/10 px-6 py-3 text-center font-medium text-yellow-700 hover:bg-yellow-700/20"></div>
          <div className="focusable flex h-10 w-28 items-center justify-center rounded-xl bg-red-700/10 px-6 py-3 text-center font-medium text-red-700 hover:bg-red-700/20"></div>
        </div>
      </BreadcrumbContainer>
      <TwoColumnPageContainer>
        <PieceInfoSkeleton />
        <PieceSpotsSkeleton />
      </TwoColumnPageContainer>
    </>
  );
}
