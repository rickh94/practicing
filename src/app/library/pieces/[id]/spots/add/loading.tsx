import { FiveColumnPageContainer } from "~/app/_components/containers";
import {
  BreadcrumbSkeleton,
  PieceSpotsSkeleton,
  SpotFormSkeleton,
} from "~/app/_components/skeletons";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
          Create Spot
        </h1>
      </div>
      <div className="-mb-4 flex w-full items-center justify-start sm:container">
        <BreadcrumbSkeleton size={4} />
      </div>
      <FiveColumnPageContainer>
        <div className="col-span-2 flex flex-col gap-2 rounded-xl border border-neutral-500 bg-white/80 p-4 text-neutral-900">
          <div className="flex justify-center">
            <h2 className="text-2xl font-bold">Add Spot</h2>
          </div>
          <SpotFormSkeleton />
        </div>
        <PieceSpotsSkeleton extraClasses="col-span-3" />
      </FiveColumnPageContainer>
    </>
  );
}
