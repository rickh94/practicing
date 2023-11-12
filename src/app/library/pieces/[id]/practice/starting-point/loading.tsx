import { BreadcrumbContainer } from "~/app/_components/containers";
import {
  TitleLinkSkeleton,
  StartingPointSkeleton,
  BreadcrumbSkeleton,
} from "~/app/_components/skeletons";

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
      <StartingPointSkeleton />
    </>
  );
}
