import { NarrowPageContainer } from "~/app/_components/containers";
import {
  BreadcrumbSkeleton,
  PieceSpotsSkeleton,
} from "~/app/_components/skeletons";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
          Repeat Practice
        </h1>
      </div>
      <div className="-mb-4 flex w-full items-center justify-start sm:container">
        <BreadcrumbSkeleton size={4} />
      </div>
      <NarrowPageContainer>
        <PieceSpotsSkeleton extraClasses="w-full" wide />
      </NarrowPageContainer>
    </>
  );
}
