import { PageColumnLayout } from "~/app/_components/page-layout";
import { RepeatPrepareText } from "~/app/_components/practice/repeat-prepare-text";
import { LinkSkeleton } from "~/app/_components/skeletons";
import { TitleLinkSkeleton } from "~/app/_components/skeletons";

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
        <div className="flex w-full flex-col">
          <RepeatPrepareText />
        </div>
      </PageColumnLayout>
    </>
  );
}
