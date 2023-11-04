import Link from "next/link";
import { TwoColumnPageContainer } from "./containers";
import { cn } from "../lib/utils";
// Loading animation
export const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function LibrarySkeleton() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
          Library
        </h1>
      </div>
      <div className="flex w-full flex-col gap-2 sm:container sm:flex-row sm:items-center sm:justify-start sm:gap-4">
        <div className="flex">
          <BreadcrumbSkeleton size={1} />
        </div>
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
              className="block flex-grow rounded-xl bg-amber-700/10 px-6 py-3 text-center font-medium text-amber-700"
              href="/library/pieces"
            >
              View All Pieces
            </Link>
            <Link
              className="block flex-grow rounded-xl bg-emerald-700/10 px-6 py-3 text-center font-medium text-emerald-700 "
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
    <div
      className={cn(
        "flex flex-col gap-1 rounded-xl bg-neutral-700/10 px-6 py-4 text-neutral-700",
      )}
    >
      <div className="flex h-6 w-48 justify-between bg-neutral-600/20" />
      <div className="h-6 w-36 bg-neutral-600/20" />
      <div className="h-6 w-44 bg-neutral-600/20" />
    </div>
  );
}

export function PieceListSkeleton() {
  return (
    <>
      <TwoColumnPageContainer>
        {[...Array<number>(12)].map((idx) => (
          <PieceCardSkeleton key={idx} />
        ))}
      </TwoColumnPageContainer>
    </>
  );
}

export function PieceInfoSkeleton() {
  return (
    <div className="rounded-xl bg-neutral-700/5 p-4">
      <div className="flex flex-col">
        <h2 className="py-1 text-center text-2xl font-bold">
          About this Piece
        </h2>
      </div>
      <dl className="divide-y divide-neutral-700 border-t border-neutral-700">
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
            <div className="h-10 w-full rounded-xl bg-amber-700/20" />
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function PieceSpotsSkeleton({
  extraClasses = "",
}: {
  extraClasses?: string;
}) {
  return (
    <div className={cn("rounded-xl bg-neutral-700/5 p-4", extraClasses)}>
      <div className="flex flex-col">
        <h2 className="py-1 text-center text-2xl font-bold">Spots</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="focusable flex h-20 justify-between rounded-xl border border-neutral-500 bg-white/80 px-4 py-2 text-neutral-700 hover:bg-white hover:text-black" />
        <div className="focusable flex h-20 justify-between rounded-xl border border-neutral-500 bg-white/80 px-4 py-2 text-neutral-700 hover:bg-white hover:text-black" />
        <div className="focusable flex h-20 justify-between rounded-xl border border-neutral-500 bg-white/80 px-4 py-2 text-neutral-700 hover:bg-white hover:text-black" />
        <div className="focusable flex h-20 justify-between rounded-xl border border-neutral-500 bg-white/80 px-4 py-2 text-neutral-700 hover:bg-white hover:text-black" />
      </div>
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
            <div className="h-10 w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 " />
          </div>
        </div>
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <div className="flex h-full w-full items-center">
            <div className="h-8 w-32 bg-neutral-600/20 text-sm font-medium leading-6" />
          </div>
          <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-10 w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 " />
          </div>
        </div>
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <div className="flex h-full w-full items-center">
            <div className="h-8 w-32 bg-neutral-600/20 text-sm font-medium leading-6" />
          </div>
          <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-24 w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 " />
          </div>
        </div>
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <div className="flex h-full w-full items-center">
            <div className="h-8 w-32 bg-neutral-600/20 text-sm font-medium leading-6" />
          </div>
          <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-10 w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 " />
          </div>
        </div>
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <div className="flex h-full w-full items-center">
            <div className="h-8 w-32 bg-neutral-600/20 text-sm font-medium leading-6" />
          </div>
          <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-24 w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 " />
          </div>
        </div>
      </div>
      <div className="pt-2 text-left text-3xl font-bold">
        <div className="h-10 w-64 bg-neutral-700/50 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 " />
      </div>
      <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex h-72 flex-col gap-2 rounded-xl border border-dashed border-neutral-500 bg-white/50 px-4 py-2 text-neutral-700" />
      </div>
      <div className="flex flex-row-reverse justify-start gap-4 py-4">
        <div className="h-12 w-24 rounded-xl bg-amber-700/10 px-4 py-2 font-semibold" />
        <div className="h-12 w-24 rounded-xl bg-emerald-700/10 px-4 py-2 font-semibold" />
      </div>
    </>
  );
}

export function BreadcrumbSkeleton({ size }: { size: number }) {
  return (
    <div>
      <div className="flex h-12 rounded-xl bg-neutral-900/10">
        {[...Array<number>(size)].map((_, i) => (
          <div className="w-24" key={i} />
        ))}
      </div>
    </div>
  );
}

export function AccountSkeleton() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
          Your Account
        </h1>
      </div>
      <TwoColumnPageContainer>
        <div className="h-72 rounded-xl bg-neutral-700/5 p-4 sm:h-64">
          <div className="px-4 pb-1 sm:px-0">
            <h3 className="text-xl font-semibold leading-7 text-neutral-900">
              Account Information
            </h3>
            <p className="max-w-2xl text-sm leading-6 text-neutral-500">
              View your account information
            </p>
          </div>
          <UserInfoSkeleton />
          <div className="mt-4 block h-8 w-32 rounded-xl bg-amber-700/10 px-4 py-2 font-semibold text-amber-700"></div>
        </div>
        <PasskeySkeleton />
      </TwoColumnPageContainer>
    </>
  );
}
export function UserInfoSkeleton() {
  return (
    <div className="px-4 pb-1 sm:px-0">
      <dl className="divide-y divide-neutral-700 border-y border-neutral-700">
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-900">
            Full name
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-6 w-40 bg-neutral-600/20 text-sm font-medium leading-6" />
          </dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-900">
            Email
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-6 w-48 bg-neutral-600/20 text-sm font-medium leading-6" />
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function PasskeySkeleton() {
  return (
    <div className="h-72 rounded-xl bg-neutral-700/5 p-4 sm:h-64">
      <div className="px-4 pb-1 sm:px-0">
        <h3 className="text-xl font-semibold leading-7 text-neutral-900">
          Passkey Information
        </h3>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500">
          Manage your passkeys
        </p>
      </div>
      <dl className="divide-y divide-neutral-700 border-t border-neutral-700">
        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-900">
            Number of Passkeys
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-6 w-48 bg-neutral-600/20 text-sm font-medium leading-6" />
          </dd>
        </div>
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="flex items-center text-sm font-medium leading-6 text-neutral-900">
            <span>Register a Passkey</span>
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-10 w-48 rounded-xl bg-emerald-700/10 px-4 py-2 font-semibold text-neutral-800 transition duration-200" />
          </dd>
        </div>
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="flex items-center text-sm font-medium leading-6 text-neutral-900">
            <span>Delete Your Passkeys</span>
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <div className="h-10 w-40 rounded-xl bg-rose-700/10 px-4 py-2 font-semibold text-neutral-800 transition duration-200" />
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function LinkSkeleton() {
  return (
    <div className="flex h-14 w-32 items-center gap-2 rounded-xl bg-neutral-700/10 px-6 py-4 font-semibold text-neutral-700 transition-all duration-200" />
  );
}
