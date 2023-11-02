import {
  BreadcrumbContainer,
  NarrowPageContainer,
} from "~/app/_components/containers";
import { BreadcrumbSkeleton, shimmer } from "~/app/_components/skeletons";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800 sm:text-5xl">
          <div
            className={`my-2 h-10 w-52 bg-neutral-800/40 sm:w-64 ${shimmer}`}
          />
        </h1>
      </div>
      <BreadcrumbContainer>
        <div className="flex">
          <BreadcrumbSkeleton size={4} />
        </div>

        <div className="flex justify-end gap-2">
          <div className="focusable flex h-10 w-28 items-center justify-center rounded-xl bg-yellow-700/10 px-6 py-3 text-center font-medium text-yellow-700 hover:bg-yellow-700/20"></div>
          <div className="focusable flex h-10 w-28 items-center justify-center rounded-xl bg-red-700/10 px-6 py-3 text-center font-medium text-red-700 hover:bg-red-700/20"></div>
        </div>
      </BreadcrumbContainer>
      <NarrowPageContainer>
        <div className="grid grid-cols-1 gap-4 rounded-xl border border-neutral-500 bg-white/80 p-4 text-neutral-900 sm:grid-cols-3">
          <div className="col-span-full flex justify-center text-center">
            <h2 className="border-b-2 border-neutral-500 px-4 text-2xl font-bold">
              <div className={`my-2 h-10 w-32 bg-neutral-800/40 ${shimmer}`} />
            </h2>
          </div>

          <div>
            <dl className="divide-y divide-neutral-700 border-y border-neutral-700 text-base">
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-medium leading-6 text-neutral-900">
                  Order
                </dt>
                <dd className="mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  <div className={`h-6 w-10 bg-neutral-800/40 ${shimmer}`} />
                </dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-medium leading-6 text-neutral-900">
                  Measures
                </dt>
                <dd className="mt-1 leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  <div className={`h-6 w-24 bg-neutral-800/40 ${shimmer}`} />
                </dd>
              </div>
            </dl>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-1 rounded-xl bg-yellow-500/50 py-2 pl-4 pr-2 font-semibold text-yellow-800  transition duration-200 hover:bg-yellow-300/50">
              <div className="flex items-center gap-2">
                <div className={`bg-white-800/40 h-6 w-24 ${shimmer}`} />
              </div>
            </div>
            <div className="flex items-center justify-between gap-1 rounded-xl bg-lime-500/50 py-2 pl-4 pr-2 font-semibold text-lime-800  transition duration-200 hover:bg-lime-300/50">
              <div className="flex items-center gap-2">
                <div className={`bg-white-800/40 h-6 w-24 ${shimmer}`} />
              </div>
            </div>
            <div className="flex items-center justify-between gap-1 rounded-xl bg-sky-500/50 py-2 pl-4 pr-2 font-semibold text-sky-800  transition duration-200 hover:bg-sky-300/50">
              <div className="flex items-center gap-2">
                <div className={`bg-white-800/40 h-6 w-24 ${shimmer}`} />
              </div>
            </div>
          </div>
        </div>
      </NarrowPageContainer>
    </>
  );
}
