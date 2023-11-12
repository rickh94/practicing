import { PageColumnLayout } from "~/app/_components/page-layout";
import {
  LinkSkeleton,
  TitleLinkSkeleton,
  StartingPointSkeleton,
} from "~/app/_components/skeletons";

export default function Loading() {
  return (
    <>
      <PageColumnLayout
        leftButton={<LinkSkeleton />}
        rightButton={<LinkSkeleton />}
      >
        <div className="flex items-center justify-center">
          <TitleLinkSkeleton />
        </div>
        <StartingPointSkeleton />
      </PageColumnLayout>
    </>
  );
}
