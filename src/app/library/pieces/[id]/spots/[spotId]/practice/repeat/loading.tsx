import { PageColumnLayout } from "~/app/_components/page-layout";
import { RepeatPrepareText } from "~/app/_components/practice/repeat-prepare-text";
import { LinkSkeleton, shimmer } from "~/app/_components/skeletons";

export default function Loading() {
  return (
    <>
      <PageColumnLayout
        leftButton={<LinkSkeleton />}
        rightButton={<LinkSkeleton />}
      >
        <div className="flex items-center justify-center">
          <div
            className={`my-2 h-10 w-52 bg-neutral-800/40 sm:w-64 ${shimmer}`}
          />
        </div>
        <div className="flex w-full flex-col">
          <RepeatPrepareText />
        </div>
      </PageColumnLayout>
    </>
  );
}
