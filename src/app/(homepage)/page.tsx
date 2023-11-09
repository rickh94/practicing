import Link from "next/link";
import { PageHeroLayout } from "~/app/_components/page-layout";

import { LeftLink, RightLink } from "./links";
import { Suspense } from "react";
import { LinkSkeleton } from "../_components/skeletons";

// TODO: maybe move buttons again
// TODO: have a way to get to ad-hoc practice tools quickly

export default function Home() {
  return (
    <>
      <PageHeroLayout
        rightButton={
          <Suspense fallback={<LinkSkeleton />}>
            <RightLink />
          </Suspense>
        }
        leftButton={
          <Suspense fallback={<LinkSkeleton />}>
            <LeftLink />
          </Suspense>
        }
      >
        <svg
          version="1.1"
          viewBox="0 0 512 512"
          className="-mb-8 -mt-12 h-64 w-64 text-neutral-700"
          aria-hidden="true"
        >
          <title>Notes and Staff</title>
          <g>
            <path
              d="M464,112h48V96H176V48c0-8.844-7.156-16-16-16s-16,7.156-16,16v48H0v16h144v64H0v16h144v23.766   c-9.438-4.813-20.281-7.766-32-7.766c-32.219,0-58.609,20.906-63.078,48H0v16h48.922c4.469,27.094,30.859,48,63.078,48   s58.609-20.906,63.078-48H256v64H0v16h256v23.766c-9.438-4.813-20.281-7.766-32-7.766c-32.219,0-58.609,20.906-63.078,48H0v16   h160.922c4.469,27.094,30.859,48,63.078,48c32.219,0,58.609-20.906,63.078-48H512v-16H288v-64h48.922   c4.469,27.094,30.859,48,63.078,48s58.609-20.906,63.078-48H512v-16h-48v-64h48v-16h-48v-64h48v-16h-48v-24.734V112z M256.563,192   c-0.155,1.281-0.563,2.484-0.563,3.797V224v32h-80v-64H256.563z M432,295.766c-9.453-4.813-20.281-7.766-32-7.766   c-32.219,0-58.609,20.906-63.078,48H288v-64h144V295.766z M432,256H290.672l138.656-64H432V256z M176,176v-64h230.016   l-131.813,56.234c-4.109,1.75-7.453,4.563-10.328,7.766H176L176,176z"
              fill="currentColor"
            />
          </g>
        </svg>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem] md:text-[4rem]">
          You Can Practice Better
        </h1>
        <p className="text-xl text-neutral-700">
          Your practicing habits might be holding you back, get started
          practicing more efficiently today!
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="focusable flex max-w-xs flex-col gap-4 rounded-xl bg-neutral-700/10 p-4 text-neutral-700 transition-all duration-200 hover:bg-neutral-700/20"
            href="/practice/random-spots"
          >
            <h3 className="text-2xl font-bold text-neutral-800">
              Start Practicing →
            </h3>
            <div className="text-lg">
              Leave behind your old habits and get started practicing better
              right now!
            </div>
          </Link>
          <Link
            className="focusable transtion-all flex max-w-xs flex-col gap-4 rounded-xl bg-neutral-700/10 p-4 text-neutral-700 duration-200 hover:bg-neutral-700/20"
            href="/about"
          >
            <h3 className="text-2xl font-bold text-neutral-800">
              Learn More →
            </h3>
            <div className="text-lg">
              Learn about the different ways you can improve your music
              practicing habits today.
            </div>
          </Link>
        </div>
      </PageHeroLayout>
    </>
  );
}
