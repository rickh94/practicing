import {
  BreadcrumbContainer,
  NarrowPageContainer,
} from "~/app/_components/containers";
import {
  BreadcrumbSkeleton,
  SpotFormSkeleton,
} from "~/app/_components/skeletons";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800 sm:text-5xl">
          Update Spot
        </h1>
      </div>
      <BreadcrumbContainer>
        <BreadcrumbSkeleton size={5} />
      </BreadcrumbContainer>
      <NarrowPageContainer>
        <div className="col-span-2 flex flex-col gap-2 rounded-xl border border-neutral-500 bg-white/80 p-4 text-neutral-900">
          <div className="flex justify-center">
            <h2 className="text-2xl font-bold">Update Spot</h2>
          </div>
          <SpotFormSkeleton />
        </div>
      </NarrowPageContainer>
    </>
  );
}
