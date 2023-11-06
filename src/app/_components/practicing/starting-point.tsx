import {
  type Dispatch,
  type SetStateAction,
  useState,
  useCallback,
} from "react";
import { cn, uniqueID } from "~/lib/util";

type Section = {
  startingPoint: {
    measure: number;
    beat: number;
  };
  endingPoint: {
    measure: number;
    beat: number;
  };
  id: string;
};

export default function StartingPoint() {
  const [measures, setMeasures] = useState<number>(100);
  const [beats, setBeats] = useState<number>(4);
  const [mode, setMode] = useState<"setup" | "practice" | "summary">("setup");
  const [maxLength, setMaxLength] = useState<number>(5);
  const [summary, setSummary] = useState<Section[]>([]);

  return (
    <>
      {mode === "setup" && (
        <StartingPointSetupForm
          beats={beats}
          measures={measures}
          maxLength={maxLength}
          setMaxLength={setMaxLength}
          setBeats={setBeats}
          setMeasures={setMeasures}
          submit={() => setMode("practice")}
        />
      )}
      {mode === "practice" && (
        <StartingPointPractice
          beats={beats}
          measures={measures}
          maxLength={maxLength}
          setup={() => setMode("setup")}
          finish={(finalSummary) => {
            setSummary(finalSummary);
            console.log(finalSummary);
            setMode("summary");
          }}
        />
      )}
      {/*
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
      */}
    </>
  );
}

function StartingPointSetupForm({
  beats,
  measures,
  maxLength,
  setMaxLength,
  setBeats,
  setMeasures,
  submit,
}: {
  beats: number;
  measures: number;
  maxLength: number;
  setMaxLength: Dispatch<SetStateAction<number>>;
  setBeats: Dispatch<SetStateAction<number>>;
  setMeasures: Dispatch<SetStateAction<number>>;
  submit: () => void;
}) {
  function isValid() {
    return beats > 0 && measures > 0;
  }

  const autoSelect = useCallback(function (
    e: React.FocusEvent<HTMLInputElement>,
  ) {
    e.currentTarget.select();
  }, []);

  return (
    <>
      <div className="flex w-full flex-col">
        <div>
          <h1 className="py-1 text-left text-2xl font-bold">
            Random Starting Point
          </h1>
          <p className="text-left text-base">
            Enter the number of measures and beats per measure of your piece,
            then you can practice starting and stopping at random spots
          </p>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <label
            className="text-lg font-semibold text-neutral-800"
            htmlFor="measures"
          >
            Measures
          </label>
          <p className="pb-2 text-sm text-neutral-700">
            How many measures are in your piece?
          </p>
          <div className="flex items-center gap-2 pt-1">
            <input
              id="measures"
              className="focusable w-24 rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 transition duration-200 focus:bg-neutral-700/20"
              type="number"
              min="1"
              value={measures}
              onChange={(e) => setMeasures(parseInt(e.target.value))}
              onFocus={autoSelect}
            />
            <div className="font-medium">Measures</div>
          </div>
        </div>
        <div className="flex flex-col">
          <label
            className="text-lg font-semibold text-neutral-800"
            htmlFor="beats"
          >
            Beats per measure
          </label>
          <p className="text-sm text-neutral-700">
            How many beats are in each measure?
          </p>
          <p className="pb-2 text-sm italic text-neutral-700">
            (the top number from the time signature)
          </p>
          <div className="flex items-center gap-2 pt-1">
            <input
              id="beats"
              className="focusable w-24 rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 transition duration-200 focus:bg-neutral-700/20"
              type="number"
              min="1"
              value={beats}
              onChange={(e) => setBeats(parseInt(e.target.value))}
              onFocus={autoSelect}
            />
            <div className="font-medium">Beats</div>
          </div>
        </div>
        <div className="flex flex-col">
          <label
            className="text-lg font-semibold text-neutral-800"
            htmlFor="maxLength"
          >
            Maximum Length
          </label>
          <p className="text-sm text-neutral-700">
            The sections will be of random number of measures less than this
            number.{" "}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <input
              id="maxLength"
              className="focusable w-24 rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 transition duration-200 focus:bg-neutral-700/20"
              type="number"
              min="1"
              value={maxLength}
              onFocus={autoSelect}
              onChange={(e) => setMaxLength(parseInt(e.target.value))}
            />
            <div className="font-medium">Measures</div>
          </div>
        </div>
        <div className="col-span-full my-16 flex w-full items-center justify-center">
          <button
            disabled={!isValid()}
            type="button"
            className={cn(
              "focusable rounded-xl px-6 py-3 text-2xl font-bold text-neutral-900 transition duration-200 sm:px-8 sm:py-4 sm:text-4xl",
              {
                "bg-neutral-700/10 hover:bg-neutral-700/20": isValid(),
                "pointer-events-none bg-neutral-700/50": !isValid(),
              },
            )}
            onClick={submit}
          >
            Start Practicing
          </button>
        </div>
      </div>
    </>
  );
}

function makeRandomSection(
  measures: number,
  beats: number,
  maxLength: number,
): Section {
  // subtract one so we never start in the last measure
  const randomStartingMeasure = Math.floor(Math.random() * (measures - 1));
  // make sure we don't go past the end
  const maxOffset = Math.min(maxLength, measures - randomStartingMeasure);
  // add back in the measure we subtracted earlier.
  const randomEndingMeasure =
    Math.floor(Math.random() * (maxOffset + 1)) + randomStartingMeasure;

  return {
    startingPoint: {
      measure: randomStartingMeasure,
      // generates between 0 and beats - 1, so we need to add one
      beat: Math.floor(Math.random() * beats) + 1,
    },
    endingPoint: {
      measure: randomEndingMeasure,
      beat: Math.floor(Math.random() * beats) + 1,
    },
    id: uniqueID(),
  };
}

// TODO: change layout so back to setup button doesn't move around
// TODO: switch to react framer motion
function StartingPointPractice({
  beats,
  measures,
  maxLength,
  setup,
  finish,
}: {
  beats: number;
  measures: number;
  maxLength: number;
  setup: () => void;
  finish: (summary: Section[]) => void;
}) {
  const [practiceSummary, setPracticeSummary] = useState<Section[]>([]);
  const [section, setSection] = useState<Section>(
    makeRandomSection(measures, beats, maxLength),
  );

  const nextStartingPoint = useCallback(
    function () {
      setPracticeSummary((curr) => [...curr, section]);
      setSection(makeRandomSection(measures, beats, maxLength));
    },
    [beats, measures, section, maxLength],
  );

  const handleDone = useCallback(
    function () {
      finish(practiceSummary);
    },
    [practiceSummary, finish],
  );

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
          <SectionDisplay section={section} key={section.id} />
        </div>
        <div className="pt-12">
          <button
            type="button"
            onClick={nextStartingPoint}
            className="focusable rounded-xl bg-neutral-700/10 px-8 py-4 text-4xl font-semibold text-neutral-800 hover:bg-neutral-700/20"
          >
            Next Section
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

// TODO: style this
function SectionDisplay({ section }: { section: Section }) {
  return (
    <div>
      Start from beat {section.startingPoint.beat} of measure{" "}
      {section.startingPoint.measure} and play to {section.endingPoint.beat} of
      measure {section.endingPoint.measure}.
    </div>
  );
}
