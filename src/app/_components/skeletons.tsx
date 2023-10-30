import Link from "next/link";
// Loading animation
export const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-700/60 before:to-transparent";

export function LibrarySkeleton() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
          Library
        </h1>
      </div>
      <div className="grid w-full grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <h2 className="py-1 text-center text-2xl font-bold">
            Practicing Today
          </h2>
        </div>
        <div className="flex flex-col border-t-2 border-neutral-700 pt-2 sm:pt-4 md:border-l-2 md:border-t-0 md:pt-0">
          <LibraryPieceListSkeleton />
          <div className="mt-4 flex w-full flex-col gap-4 p-4 sm:flex-row">
            <Link
              className="focusable block flex-grow rounded-xl bg-amber-700/10 px-6 py-3 text-center font-medium text-amber-700 hover:bg-amber-700/20"
              href="/library/pieces"
            >
              View All Pieces
            </Link>
            <Link
              className="focusable block flex-grow rounded-xl bg-emerald-700/10 px-6 py-3 text-center font-medium text-emerald-700 hover:bg-emerald-700/20"
              href="/library/pieces/create"
            >
              Create New Piece
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export function LibraryPieceListSkeleton() {
  return (
    <>
      <h2 className="py-1 text-center text-2xl font-bold">Recent Pieces</h2>
      <div className={`flex flex-col gap-4 p-4 ${shimmer}`}>
        <PieceCardSkeleton />
        <PieceCardSkeleton />
        <PieceCardSkeleton />
        <PieceCardSkeleton />
        <PieceCardSkeleton />
      </div>
    </>
  );
}

export function PieceCardSkeleton() {
  return (
    <div className=" flex flex-col gap-1 rounded-xl bg-neutral-700/10 px-6 py-4 text-neutral-700 hover:bg-neutral-700/20">
      <div className="flex h-6 w-48 justify-between bg-neutral-600/20" />
      <div className="h-6 w-36 bg-neutral-600/20" />
      <div className="h-6 w-44 bg-neutral-600/20" />
    </div>
  );
}

export function PieceListSkeleton() {
  return (
    <>
      <div
        className={`grid w-full grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 ${shimmer}`}
      >
        {[...Array<number>(12)].map((idx) => (
          <PieceCardSkeleton key={idx} />
        ))}
      </div>
    </>
  );
}

export function PieceInfoSkeleton() {
  return (
    <div>
      <div className="flex flex-col">
        <h2 className="py-1 text-center text-2xl font-bold">
          About this Piece
        </h2>
      </div>
      <dl className="divide-y divide-neutral-700 border-y border-neutral-700">
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-900">
            Title
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-6 w-full bg-neutral-600/20" />
          </dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-900">
            Composer
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-6 w-full bg-neutral-600/20" />
          </dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-900">
            Description
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-6 w-full bg-neutral-600/20" />
          </dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-900">
            Practice Notes
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-6 w-full bg-neutral-600/20" />
          </dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-900">
            Recording
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div
              className={`focusable block h-10 flex-grow rounded-xl bg-amber-700/10 px-2 py-2 text-center font-medium text-amber-700 hover:bg-amber-700/20 ${shimmer}`}
            />
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function PieceFormSkeleton() {
  return (
    <>
      <div
        className={`divide-y divide-neutral-700  border-y border-neutral-700 ${shimmer}`}
      >
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <div className="flex h-full w-full items-center">
            <div className="h-8 w-32 bg-neutral-600/20 text-sm font-medium leading-6" />
          </div>
          <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-10 w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20" />
          </div>
        </div>
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <div className="flex h-full w-full items-center">
            <div className="h-8 w-32 bg-neutral-600/20 text-sm font-medium leading-6" />
          </div>
          <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-10 w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20" />
          </div>
        </div>
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <div className="flex h-full w-full items-center">
            <div className="h-8 w-32 bg-neutral-600/20 text-sm font-medium leading-6" />
          </div>
          <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-24 w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20" />
          </div>
        </div>
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <div className="flex h-full w-full items-center">
            <div className="h-8 w-32 bg-neutral-600/20 text-sm font-medium leading-6" />
          </div>
          <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-10 w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20" />
          </div>
        </div>
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <div className="flex h-full w-full items-center">
            <div className="h-8 w-32 bg-neutral-600/20 text-sm font-medium leading-6" />
          </div>
          <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-24 w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20" />
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse justify-start gap-4 py-4">
        <div className="h-10 w-24 rounded-xl bg-neutral-700/50 px-4 py-2 font-semibold" />
        <div className="h-10 w-24 rounded-xl bg-neutral-700/50 px-4 py-2 font-semibold" />
      </div>
    </>
  );
}
