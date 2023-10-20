import { type PropsWithChildren } from "react";

export function PageHeroLayout(props: PropsWithChildren) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#ffefce] to-[#ffffff]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {props.children}
      </div>
    </main>
  );
}

export function PageColumnLayout(props: PropsWithChildren) {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-[#ffefce] to-[#ffffff]">
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 px-4 py-8">
        {props.children}
      </div>
    </main>
  );
}
