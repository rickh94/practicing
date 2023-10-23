import Link from "next/link";
import { type PropsWithChildren } from "react";

// TODO: add skip to content button to layouts
export function PageHeroLayout(props: PropsWithChildren) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#ffefce] to-[#ffffff]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {props.children}
      </div>
    </main>
  );
}

export function PageColumnLayout({
  children,
  backLink = false,
  backLinkTo,
  backLinkText,
}: {
  children: React.ReactNode;
  backLink?: boolean;
  backLinkTo?: string;
  backLinkText?: string;
}) {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-[#ffefce] to-[#ffffff]">
      {backLink && (
        <>
          <div className="absolute left-0 top-0 p-8">
            <Link
              className="focusable block rounded-xl bg-neutral-700/10 px-6 py-4 font-semibold text-neutral-700 hover:bg-neutral-700/20"
              href={backLinkTo ?? "/error"}
            >
              ← {backLinkText ?? "MISSING PROP"}
            </Link>
          </div>
        </>
      )}
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 px-4 py-8">
        {backLink && <div className="h-4 lg:hidden" />}
        {children}
      </div>
    </main>
  );
}
