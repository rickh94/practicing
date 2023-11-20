import { Transition } from "@headlessui/react";
import {
  BasicButton,
  GiantBasicButton,
  GiantHappyButton,
  WarningButton,
} from "@ui/buttons";
import { ScaleCrossFadeContent } from "@ui/transitions";
import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
  useCallback,
} from "react";
import {
  type PracticeSummaryItem,
  type RandomMode,
  type Spot,
} from "~/lib/random";
import { CreateSpots } from "./createSpots";
import Summary from "./summary";
import { uniqueID } from "~/lib/util";

export default function SingleTab({
  mode,
  setMode,
  initialSpots,
  onCompleted,
  pieceHref,
}: {
  mode: RandomMode;
  setMode: (mode: RandomMode) => void;
  initialSpots?: Spot[];
  onCompleted?: (spotIds: string[]) => void;
  pieceHref?: string;
}) {
  const [spots, setSpots] = useState<Spot[]>(initialSpots ?? []);
  const [skipSpotIds, setSkipSpotIds] = useState<string[]>([]);
  const [summary, setSummary] = useState<PracticeSummaryItem[]>([]);

  const finish = useCallback(
    function (finalSummary: PracticeSummaryItem[]) {
      setSummary(finalSummary);
      setMode("summary");
      onCompleted?.(finalSummary.map((s) => s.id));
    },
    [onCompleted, setMode, setSummary],
  );

  return (
    <div className="absolute left-0 top-0 w-full">
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
                finish={finish}
                skipSpotIds={skipSpotIds}
                setSkipSpotIds={setSkipSpotIds}
              />
            ),
            summary: (
              <Summary
                summary={summary}
                setup={() => setMode("setup")}
                practice={() => setMode("practice")}
                pieceHref={pieceHref}
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

// TODO: show spot prompts alongside name

function SinglePractice({
  spots,
  setup,
  finish,
}: {
  spots: { name: string; id: string }[];
  setup: () => void;
  finish: (summary: PracticeSummaryItem[]) => void;
  skipSpotIds: string[];
  setSkipSpotIds: Dispatch<SetStateAction<string[]>>;
}) {
  const [currentSpotIdx, setCurrentSpotIdx] = useState(
    Math.floor(Math.random() * spots.length),
  );
  const [practiceSummary, setPracticeSummary] = useState<number[]>([]);
  // This counter ensures that the animation runs, even if the same spot is generated twice in a row.
  const [counter, setCounter] = useState(0);
  const [skipSpotIds, setSkipSpotIds] = useState<string[]>([]);

  const addSpotRep = useCallback(
    function (idx: number) {
      setPracticeSummary((curr) => {
        curr[idx] += 1;
        return curr;
      });
    },
    [setPracticeSummary],
  );

  const handleDone = useCallback(
    function () {
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
    },
    [practiceSummary, finish, addSpotRep, currentSpotIdx, spots],
  );

  useEffect(() => {
    setPracticeSummary(Array(spots.length).fill(0));
  }, [spots]);

  const nextSpot = useCallback(
    function () {
      setCounter((curr) => curr + 1);
      addSpotRep(currentSpotIdx);
      if (skipSpotIds.length >= spots.length) {
        handleDone();
        return;
      }
      let nextSpotIdx = Math.floor(Math.random() * spots.length);
      let nextSpotId = spots[nextSpotIdx]?.id;
      while (!nextSpotId || (nextSpotId && skipSpotIds.includes(nextSpotId))) {
        nextSpotIdx = Math.floor(Math.random() * spots.length);
        nextSpotId = spots[nextSpotIdx]?.id;
      }
      setCurrentSpotIdx(nextSpotIdx);
    },
    [addSpotRep, currentSpotIdx, handleDone, skipSpotIds, spots],
  );

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
          <ScaleCrossFadeContent
            component={
              <div className="flex justify-center">
                <div className="rounded-xl border border-neutral-500 bg-white/90 px-4 pb-5 pt-4 text-center text-5xl font-bold shadow-lg sm:px-8 sm:text-xl">
                  {spots[currentSpotIdx]?.name ?? "Something went wrong"}
                </div>
              </div>
            }
            id={`${currentSpotIdx}-${counter}`}
          />
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
