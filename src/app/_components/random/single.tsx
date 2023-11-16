import { Transition } from "@headlessui/react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import {
  type RandomMode,
  type PracticeSummaryItem,
  type Spot,
} from "~/lib/random";
import Summary from "./summary";
import { CreateSpots } from "./createSpots";
import { ScaleCrossFadeContent } from "@ui/transitions";
import {
  BasicButton,
  GiantBasicButton,
  GiantHappyButton,
  WarningButton,
} from "@ui/buttons";

export default function SingleTab({
  mode,
  setMode,
  initialSpots,
}: {
  mode: RandomMode;
  setMode: (mode: RandomMode) => void;
  initialSpots?: Spot[];
}) {
  const [spots, setSpots] = useState<Spot[]>(initialSpots ?? []);
  const [summary, setSummary] = useState<PracticeSummaryItem[]>([]);

  return (
    <div className="absolute left-0 top-0 w-full sm:mx-auto sm:max-w-3xl">
      <ScaleCrossFadeContent
        component={
          {
            setup: (
              <SingleSetupForm
                setSpots={setSpots}
                spots={spots}
                submit={() => setMode("practice")}
              />
            ),
            practice: (
              <SinglePractice
                spots={spots}
                setup={() => setMode("setup")}
                finish={(finalSummary) => {
                  setSummary(finalSummary);
                  setMode("summary");
                }}
              />
            ),
            summary: (
              <Summary
                summary={summary}
                setup={() => setMode("setup")}
                practice={() => setMode("practice")}
              />
            ),
          }[mode]
        }
        id={mode}
      />
    </div>
  );
}

function SingleSetupForm({
  setSpots,
  spots,
  submit,
}: {
  setSpots: Dispatch<SetStateAction<Spot[]>>;
  submit: () => void;
  spots: Spot[];
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
          <GiantBasicButton disabled={spots.length === 0} onClick={submit}>
            Start Practicing
          </GiantBasicButton>
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
  spots: { name: string; id: string }[];
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
    const finalSummary: PracticeSummaryItem[] = [];
    for (let i = 0; i < spots.length; i++) {
      finalSummary.push({
        name: spots[i]?.name ?? "Missing spot name",
        reps: practiceSummary[i] ?? 0,
        id: spots[i]?.id ?? "Missing spot id",
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
    <div className="relative w-full">
      <div className="absolute left-0 top-0 py-2 sm:py-4">
        <BasicButton onClick={setup}>← Back to setup</BasicButton>
      </div>
      <div className="h-12" />
      <div className="flex w-full flex-col items-center justify-center gap-2 pt-8 sm:pt-24">
        <div className="text-2xl font-semibold text-neutral-700">
          Practicing:
        </div>
        <div className="relative h-32 w-full">
          <Transition
            className="absolute left-1/2 top-0 mt-4 w-max -translate-x-1/2 transform rounded-xl border border-neutral-500 bg-white/90 px-8 pb-5 pt-4 text-3xl font-bold text-black shadow-lg sm:pb-8 sm:pt-7 sm:text-[3rem]"
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
          <GiantHappyButton type="button" onClick={nextSpot}>
            Next Spot
          </GiantHappyButton>
        </div>
        <div className="pt-8">
          <WarningButton onClick={handleDone}>Done</WarningButton>
        </div>
      </div>
    </div>
  );
}
