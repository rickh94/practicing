import { BreadcrumbContainer } from "~/app/_components/containers";
import { BreadcrumbSkeleton, TabSkeleton } from "~/app/_components/skeletons";
import { TitleLinkSkeleton } from "~/app/_components/skeletons";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center">
        <TitleLinkSkeleton />
      </div>
      <div className="flex w-full items-center justify-start">
        <BreadcrumbContainer>
          <BreadcrumbSkeleton size={4} />
        </BreadcrumbContainer>
      </div>
      <div className="flex w-full flex-col">
        <TabSkeleton />
        <div className="flex w-full flex-col py-4">
          <div>
            <h1 className="py-1 text-left text-2xl font-bold">
              Single Random Spots
            </h1>
            <p className="text-left text-base">
              Enter your spots one at a time, or generate a bunch of spots at
              once.
            </p>
          </div>
          <div className="flex-shrink-0 flex-grow"></div>
        </div>
      </div>
    </>
  );
}
