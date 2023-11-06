import { useState } from "react";
import { Transition } from "@headlessui/react";
import SingleTab from "~/app/_components/random/single";
import SequenceTab from "~/app/_components/random/sequence";
import { type RandomMode } from "~/lib/random";

export default function TabChooser() {
  const [tab, setTab] = useState<"single" | "sequence">("single");
  const [mode, setMode] = useState<RandomMode>("setup");
  return (
    <>
      <div className="container relative mx-auto flex flex-col gap-8 px-2">
        <Transition
          show={mode === "setup"}
          enter="transition ease-out transform duration-200 delay-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in transform duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="absolute left-1/2 top-0 flex w-full -translate-x-1/2 transform items-center justify-center"
          unmount={false}
        >
          <div className="flex w-full items-center justify-center rounded-xl bg-neutral-700/10 p-1 sm:max-w-lg">
            <button
              type="button"
              className={`w-1/2 rounded-xl py-2 transition-all duration-200 ${
                tab === "single" && "bg-neutral-700/20 font-semibold text-black"
              }`}
              onClick={() => setTab("single")}
            >
              Single
            </button>
            <button
              type="button"
              className={`w-1/2 rounded-xl py-2 transition-all duration-200 ${
                tab === "sequence" &&
                "bg-neutral-700/20 font-semibold text-black"
              }`}
              onClick={() => setTab("sequence")}
            >
              Sequence
            </button>
          </div>
        </Transition>
        <div className="h-8" />
        <div className="relative">
          <SingleTab show={tab === "single"} mode={mode} setMode={setMode} />
          <SequenceTab
            show={tab === "sequence"}
            mode={mode}
            setMode={setMode}
          />
        </div>
      </div>
    </>
  );
}
