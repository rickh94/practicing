import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import RadioBox from "~/app/_components/radio";
import { type RandomMode } from "~/lib/random";
import Summary from "./summary";
import { type PracticeSummaryItem } from "~/lib/random";
import { CheckCircleIcon as CheckCircleOutline } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/20/solid";

export default function SequenceTab({
  show,
  mode,
  setMode,
}: {
  show: boolean;
  mode: RandomMode;
  setMode: (mode: RandomMode) => void;
}) {
  const [numSpots, setNumSpots] = useState(5);
  const [fullyRandom, setFullyRandom] = useState(false);
  const [spots, setSpots] = useState<string[]>([]);
  const [summary, setSummary] = useState<PracticeSummaryItem[]>([]);

  useEffect(() => {
    const spots: string[] = [];
    for (let i = 0; i < numSpots; i++) {
      spots.push(`Spot #${i + 1}`);
    }
    if (fullyRandom) {
      const randomSpots: string[] = [];
      for (let i = 0; i < 2 * numSpots; i++) {
        const randomSpot = spots[Math.floor(Math.random() * spots.length)];
        if (!randomSpot) {
          throw new Error("invalid random spot");
        }
        randomSpots.push(randomSpot);
      }
      setSpots(randomSpots);
    } else {
      spots.sort(() => Math.random() - 0.5);
      setSpots(spots);
    }
  }, [numSpots, fullyRandom]);

  function moreSpots() {
    if (!fullyRandom) {
      return;
    }
    const randomSpots: string[] = [];
    for (let i = 0; i < 2 * numSpots; i++) {
      const randomSpot = spots[Math.floor(Math.random() * spots.length)];
      if (!randomSpot) {
        throw new Error("invalid random spot");
      }
      randomSpots.push(randomSpot);
    }
    setSpots((spots) => spots.concat(randomSpots));
  }

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
        <SequenceSetupForm
          numSpots={numSpots}
          setNumSpots={setNumSpots}
          fullyRandom={fullyRandom}
          setFullyRandom={setFullyRandom}
          submit={() => setMode("practice")}
        />
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
        <SequencePractice
          spots={spots}
          setup={() => setMode("setup")}
          finish={(finalSummary) => {
            setSummary(finalSummary);
            setMode("summary");
          }}
          moreSpots={moreSpots}
          fullyRandom={fullyRandom}
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

function SequenceSetupForm({
  numSpots,
  setNumSpots,
  fullyRandom,
  setFullyRandom,
  submit,
}: {
  numSpots: number;
  setNumSpots: (numSpots: number) => void;
  fullyRandom: boolean;
  setFullyRandom: (fullyRandom: boolean) => void;
  submit: () => void;
}) {
  // TODO: add ability to rate spots
  return (
    <>
      <div className="py-2">
        <h1 className="py-1 text-2xl font-bold">Random Spots Sequence</h1>
        <p className="text-lg">
          Generates a random sequence of spots to practice to practice.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-neutral-800">
            Number of spots
          </label>
          <p className="pb-2 text-sm text-neutral-700">
            How many spots will you be practicing?
          </p>
          <div className="flex gap-2">
            <button
              className="focusable rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 transition duration-200 hover:bg-neutral-700/20"
              type="button"
              onClick={() => numSpots > 1 && setNumSpots(numSpots - 1)}
            >
              Decrease
            </button>
            <input
              className="focusable w-20 rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 transition duration-200 focus:bg-neutral-700/20"
              type="number"
              min="1"
              value={numSpots}
              onChange={(e) => setNumSpots(parseInt(e.target.value))}
            />
            <button
              className="focusable rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 transition duration-200 hover:bg-neutral-700/20"
              type="button"
              onClick={() => setNumSpots(numSpots + 1)}
            >
              Increase
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-neutral-800">
            Randomness
          </label>
          <p className="pb-2 text-sm text-neutral-700">
            Choose to either generate a fully random sequence or use each spot
            once before repeating.
          </p>
          <div className="flex w-full gap-2">
            {/* TODO: fix ring, border outline, add no*/}
            <RadioBox
              text="Fully Random"
              setSelected={() => setFullyRandom(true)}
              selected={fullyRandom}
              value="random"
              name="random"
            />
            <RadioBox
              text="Each Spot Once"
              setSelected={() => setFullyRandom(false)}
              selected={!fullyRandom}
              value="each"
              name="each"
            />
          </div>
        </div>
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

function SequencePractice({
  spots,
  setup,
  finish,
  moreSpots,
  fullyRandom,
}: {
  spots: string[];
  setup: () => void;
  moreSpots: () => void;
  finish: (summary: PracticeSummaryItem[]) => void;
  fullyRandom: boolean;
}) {
  function handleDone() {
    const finalSummary: PracticeSummaryItem[] = [];
    for (const spot of spots) {
      const spotIndex = finalSummary.findIndex((item) => item.name === spot);
      if (spotIndex === -1) {
        finalSummary.push({
          name: spot ?? "Missing spot name",
          reps: 1,
        });
      } else {
        if (!finalSummary[spotIndex]) {
          throw new Error("Invalid final summary item");
        }
        finalSummary[spotIndex]!.reps += 1;
      }
    }
    finish(finalSummary);
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
        <div className="w-full">
          <ul className="mx-auto grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {spots.map((spot, idx) => (
              <SpotItem key={`${spot}-${idx}`} spot={spot} />
            ))}

            {fullyRandom && (
              <button
                type="button"
                className="focusable rounded-xl bg-neutral-700/10 px-6 py-2 text-2xl font-semibold text-neutral-800 hover:bg-neutral-700/20"
                onClick={moreSpots}
              >
                More Spots...
              </button>
            )}
          </ul>
        </div>
      </div>
      <div className="flex w-full items-center justify-center pt-8">
        <button
          type="button"
          onClick={handleDone}
          className="focusable rounded-xl bg-neutral-700/10 px-6 py-2 text-2xl font-semibold text-neutral-800 hover:bg-neutral-700/20"
        >
          Done
        </button>
      </div>
    </div>
  );
}

function SpotItem({ spot }: { spot: string }) {
  const [completed, setCompleted] = useState(false);
  return (
    <li className="w-full">
      <button
        type="button"
        className="flex w-full justify-between rounded-xl border border-neutral-500 bg-neutral-400/10 p-3 text-xl text-black shadow transition duration-100"
        onClick={() => setCompleted((completed) => !completed)}
      >
        <span className={`${completed ? "font-medium" : "font-base"}`}>
          {spot}
        </span>
        {completed ? (
          <>
            <span className="sr-only">Completed</span>
            <CheckCircleSolid className="h-6 w-6 text-green-500" />
          </>
        ) : (
          <>
            <span className="sr-only">Incomplete</span>
            <CheckCircleOutline className="h-6 w-6 text-neutral-500" />
          </>
        )}
      </button>
    </li>
  );
}
