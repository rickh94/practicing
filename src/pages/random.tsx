import { useState } from "react";
import { PageColumnLayout } from "~/components/layout";
import { Transition } from "@headlessui/react";
import { SingleMode } from "~/components/random/single";
import Link from "next/link";

export default function Random() {
  return (
    <PageColumnLayout>
      <div className="flex items-center justify-center pb-4 pt-8">
        <div className="absolute left-0 top-0 p-8">
          <Link
            className="h-8 rounded-xl bg-neutral-700/10 p-4 text-neutral-700 hover:bg-neutral-700/20"
            href="/"
          >
            ← Back Home
          </Link>
        </div>
        <div className="h-4 sm:hidden" />
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
          Practice Randomizer
        </h1>
      </div>
      <ModeChooser />
    </PageColumnLayout>
  );
}

function ModeChooser() {
  const [mode, setMode] = useState<"single" | "sequence">("single");
  return (
    <>
      <div className="container mx-auto flex flex-col gap-8 px-2">
        {/* TODO: make an expandable help element */}
        <div className="flex w-full items-center justify-center">
          <div className="flex w-full items-center justify-center rounded-xl bg-neutral-700/10 p-1 sm:max-w-lg">
            <button
              className={`w-1/2 rounded-xl py-2 transition-all duration-200 ${mode === "single" &&
                "bg-neutral-700/20 font-semibold text-black"
                }`}
              onClick={() => setMode("single")}
            >
              Single
            </button>
            <button
              className={`w-1/2 rounded-xl py-2 transition-all duration-200 ${mode === "sequence" &&
                "bg-neutral-700/20 font-semibold text-black"
                }`}
              onClick={() => setMode("sequence")}
            >
              Sequence
            </button>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-5xl bg-green-400">
          <SingleMode show={mode === "single"} />
          <SequenceMode show={mode === "sequence"} />
        </div>
      </div>
    </>
  );
}

function SequenceMode({ show }: { show: boolean }) {
  return (
    <Transition
      show={show}
      enter="transition ease-out transform duration-300"
      enterFrom="opacity-0 translate-x-full"
      enterTo="opacity-100 translate-x-0"
      leave="transition ease-in transform duration-300"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-full"
    >
      {/* TODO: create the sequence view with a configuration and a nice interface to check off spots */}
      <div className="absolute left-0 top-0 w-full bg-blue-400">Sequence</div>
    </Transition>
  );
}
