import { Transition } from "@headlessui/react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { type RandomMode, type PracticeSummaryItem } from "~/lib/random";
import Summary from "./summary";
import { CreateSpots } from "./createSpots";

export default function SingleTab({
  show,
  mode,
  setMode,
}: {
  show: boolean;
  mode: RandomMode;
  setMode: (mode: RandomMode) => void;
}) {
  const [spots, setSpots] = useState<{ name: string }[]>([]);
  const [summary, setSummary] = useState<PracticeSummaryItem[]>([]);

  return (
    <Transition
      show={show}
      enter="transition ease-out transform duration-300"
      enterFrom="opacity-0 -translate-x-full"
      enterTo="opacity-100 translate-x-0"
      leave="transition ease-in transform duration-300"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 -translate-x-full"
    >
      <Transition
        className="absolute left-0 top-0 w-full"
        show={mode === "setup"}
        enter="transition ease-out transform duration-200 delay-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in transform duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="relative w-full sm:mx-auto sm:max-w-3xl">
          <SingleSetupForm
            setSpots={setSpots}
            spots={spots}
            submit={() => setMode("practice")}
          />
        </div>
      </Transition>
      <Transition
        show={mode === "practice"}
        className="absolute left-0 top-0 -mt-12 w-full"
        enter="transition ease-out transform duration-200 delay-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in transform duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <SinglePractice
          spots={spots}
          setup={() => setMode("setup")}
          finish={(finalSummary) => {
            setSummary(finalSummary);
            setMode("summary");
          }}
        />
      </Transition>
      <Transition
        show={mode === "summary"}
        className="absolute left-0 top-0 -mt-12 w-full"
        enter="transition ease-out transform duration-200 delay-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in transform duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Summary
          summary={summary}
          setup={() => setMode("setup")}
          practice={() => setMode("practice")}
        />
      </Transition>
    </Transition>
  );
}

function SingleSetupForm({
  setSpots,
  spots,
  submit,
}: {
  setSpots: Dispatch<SetStateAction<{ name: string }[]>>;
  submit: () => void;
  spots: { name: string }[];
}) {
  return (
    <>
      <div className="flex w-full flex-col py-4">
        <div>
          <h1 className="py-1 text-left text-2xl font-bold">
            Single Random Spots
          </h1>
          <p className="text-left text-base">
            Enter your spots one at a time, or generate a bunch of spots at
            once.
          </p>
        </div>
        <div className="flex-shrink-0 flex-grow"></div>
      </div>
      <div className="flex w-full flex-col gap-y-4">
        <CreateSpots setSpots={setSpots} spots={spots} />
        <div className="col-span-full my-16 flex w-full items-center justify-center">
          <button
            type="button"
            className="focusable rounded-xl bg-neutral-700/10 px-6 py-3 text-2xl font-bold text-neutral-900 transition duration-200 hover:bg-neutral-700/20 sm:px-8 sm:py-4 sm:text-4xl"
            onClick={submit}
          >
            Start Practicing
          </button>
        </div>
      </div>
    </>
  );
}

function SinglePractice({
  spots,
  setup,
  finish,
}: {
  spots: { name: string }[];
  setup: () => void;
  finish: (summary: PracticeSummaryItem[]) => void;
}) {
  const [currentSpotIdx, setCurrentSpotIdx] = useState(
    Math.floor(Math.random() * spots.length),
  );
  const [changingSpot, setChangingSpot] = useState(false);
  const [practiceSummary, setPracticeSummary] = useState<number[]>([]);

  function addSpotRep(idx: number) {
    setPracticeSummary((curr) => {
      curr[idx] += 1;
      return curr;
    });
  }

  function handleDone() {
    addSpotRep(currentSpotIdx);
    const finalSummary = [];
    for (let i = 0; i < spots.length; i++) {
      finalSummary.push({
        name: spots[i]?.name ?? "Missing spot name",
        reps: practiceSummary[i] ?? 0,
      });
    }
    finish(finalSummary);
  }

  useEffect(() => {
    setPracticeSummary(Array(spots.length).fill(0));
  }, [spots]);

  function nextSpot() {
    if (!changingSpot) {
      setChangingSpot(true);
      setTimeout(() => {
        addSpotRep(currentSpotIdx);
        setCurrentSpotIdx(Math.floor(Math.random() * spots.length));
        setChangingSpot(false);
      }, 300);
    }
  }

  return (
    <div className="relative mb-8 grid grid-cols-1">
      <div className="absolute left-0 top-0 sm:p-8">
        <button
          onClick={setup}
          type="button"
          className="focusable m-0 rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-700 hover:bg-neutral-700/20"
        >
          ← Back to setup
        </button>
      </div>
      <div className="h-12" />
      <div className="flex w-full flex-col items-center justify-center gap-2 pt-8 sm:pt-24">
        <div className="text-2xl font-semibold text-neutral-700">
          Practicing:
        </div>
        <div className="relative h-32 w-full">
          <Transition
            className="absolute left-1/2 top-0 mt-4 w-max -translate-x-1/2 transform rounded-xl border border-neutral-500 bg-neutral-400/10 px-8 pb-5 pt-4 text-3xl font-bold text-black shadow-lg sm:pb-8 sm:pt-7 sm:text-[3rem]"
            show={!changingSpot}
            enter="transition ease-out transform duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in transform duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {spots[currentSpotIdx]?.name ?? "Something went wrong"}
          </Transition>
        </div>
        <div className="pt-12">
          <button
            type="button"
            onClick={nextSpot}
            className="focusable rounded-xl bg-neutral-700/10 px-8 py-4 text-4xl font-semibold text-neutral-800 hover:bg-neutral-700/20"
          >
            Next Spot
          </button>
        </div>
        <div className="pt-8">
          <button
            type="button"
            onClick={handleDone}
            className="focusable rounded-xl bg-neutral-700/10 px-6 py-2 text-2xl font-semibold text-neutral-800 hover:bg-neutral-700/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
