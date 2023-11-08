import {
  type Dispatch,
  type SetStateAction,
  useState,
  useCallback,
  useMemo,
} from "react";
import { cn, uniqueID } from "~/lib/util";
import { ScaleCrossFadeContent } from "~/app/_components/transitions";

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

type StartingPointMode = "setup" | "practice" | "summary";

// TODO: add option for sentence or grid layout
// TODO: add option for time signature changes
//
export default function StartingPoint() {
  const [measures, setMeasures] = useState<number>(100);
  const [beats, setBeats] = useState<number>(4);
  const [mode, setMode] = useState<StartingPointMode>("setup");
  const [maxLength, setMaxLength] = useState<number>(5);
  const [summary, setSummary] = useState<Section[]>([]);

  const setModePractice = useCallback(
    function () {
      setMode("practice");
    },
    [setMode],
  );

  const setModeSetup = useCallback(
    function () {
      setMode("setup");
    },
    [setMode],
  );

  const finishPracticing = useCallback(
    function (finalSummary: Section[]) {
      setMode("summary");
      setSummary(finalSummary);
    },
    [setSummary, setMode],
  );

  return (
    <div className="relative left-0 top-0 w-full sm:mx-auto sm:max-w-5xl">
      <ScaleCrossFadeContent
        component={
          {
            setup: (
              <StartingPointSetupForm
                beats={beats}
                measures={measures}
                maxLength={maxLength}
                setMaxLength={setMaxLength}
                setBeats={setBeats}
                setMeasures={setMeasures}
                submit={setModePractice}
              />
            ),
            practice: (
              <StartingPointPractice
                beats={beats}
                measures={measures}
                maxLength={maxLength}
                setup={setModeSetup}
                finish={finishPracticing}
              />
            ),
            summary: (
              <Summary
                summary={summary}
                setup={setModeSetup}
                practice={setModePractice}
              />
            ),
          }[mode]
        }
        id={mode}
      />
    </div>
  );
}

// TODO: rewrite description
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
              min="2"
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

// TODO: maybe write a test for this function
function makeRandomSection(
  measures: number,
  beats: number,
  maxLength: number,
): Section {
  // subtract one so we never start in the last measure
  const randomStartingMeasure = Math.floor(Math.random() * (measures - 1)) + 1;
  // make sure we don't go past the end
  const maxOffset = Math.min(maxLength, measures - randomStartingMeasure);
  // add back in the measure we subtracted earlier.
  const randomEndingMeasure =
    Math.floor(Math.random() * maxOffset) + randomStartingMeasure + 1;

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
      // have to add the last one in manually
      const finalSummary = [...practiceSummary, section];
      finalSummary.sort(
        (a, b) => a.startingPoint.measure - b.startingPoint.measure,
      );
      finish(finalSummary);
    },
    [practiceSummary, finish, section],
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
      <div className="flex w-full flex-col items-center justify-center gap-2 pt-12 sm:pt-24">
        <div className="relative h-32 w-full">
          <ScaleCrossFadeContent
            component={<SectionDisplay section={section} />}
            id={section.id}
          />
        </div>
        <div className="pt-8">
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

function SectionDisplay({ section }: { section: Section }) {
  return (
    <div className="flex justify-center">
      <div className="rounded-xl border border-neutral-500 bg-white/90 px-4 pb-5 pt-4 text-center text-lg shadow-lg sm:px-8 sm:text-xl">
        <div>
          Start from measure{" "}
          <strong className="text-xl font-bold sm:text-2xl">
            {section.startingPoint.measure}
          </strong>
          {", "}beat{" "}
          <strong className="text-xl font-bold sm:text-2xl">
            {section.startingPoint.beat}
          </strong>{" "}
        </div>
        <div>
          and play until measure{" "}
          <strong className="text-xl font-bold sm:text-2xl">
            {section.endingPoint.measure}
          </strong>
          {", "}
          beat{" "}
          <strong className="text-xl font-bold sm:text-2xl">
            {section.endingPoint.beat}
          </strong>
          .
        </div>
      </div>
    </div>
  );
}

function Summary({
  summary,
  setup,
  practice,
}: {
  summary: Section[];
  setup: () => void;
  practice: () => void;
}) {
  const measuresPracticed = useMemo(
    function () {
      const measureSet = new Set<number>();
      for (const { startingPoint, endingPoint } of summary) {
        for (let i = startingPoint.measure; i <= endingPoint.measure; i++) {
          measureSet.add(i);
        }
      }
      const measureList = Array.from(measureSet.values()).sort((a, b) => a - b);
      console.log(measureList);
      const ranges: [number, number][] = [];

      // walk the list, while the numbers are sequential, keep increasing the end number,
      // once we hit a gap, add a range, reset to start at the current number and continue.
      let start: number | null = null;
      let end: number | null = null;
      for (const num of measureList) {
        if (!start || !end) {
          start = num;
          end = num;
        } else if (num === end + 1) {
          end = num;
        } else {
          if (!end) {
            end = start;
          }
          ranges.push([start, end]);
          start = num;
          end = num;
        }
      }
      if (start && end) {
        ranges.push([start, end]);
      }
      return ranges;
    },
    [summary],
  );
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-2 pt-12">
        <div className="flex w-full  justify-center py-4">
          <div className="rounded-xl border border-neutral-500 bg-white/80 px-6 py-4 text-center shadow">
            <div className="flex w-full justify-center">
              <h2 className="border-b border-black px-2 text-center text-xl font-semibold text-black">
                Measures Practiced
              </h2>
            </div>
            <div className="balanced pt-1">
              {measuresPracticed.map(([start, end], idx) => (
                <>
                  <span
                    key={`${start}-${end}`}
                    className="whitespace-nowrap text-xl font-medium text-neutral-800"
                  >
                    {start === end ? start : `${start}-${end}`}
                    {idx < measuresPracticed.length - 1 && ","}
                  </span>{" "}
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col justify-center gap-4 pb-8 pt-4 sm:flex-row sm:gap-6">
          <button
            className="focusable rounded-xl bg-amber-700/10 px-4 py-2 font-semibold text-amber-800 transition duration-200 hover:bg-amber-700/20"
            type="button"
            onClick={setup}
          >
            Back to Setup
          </button>
          <button
            className="focusable rounded-xl bg-emerald-700/10 px-4 py-2 font-semibold text-emerald-800 transition duration-200 hover:bg-emerald-700/20"
            type="button"
            onClick={practice}
          >
            Practice More
          </button>
        </div>
        <h2 className="inline pr-2 text-xl font-semibold text-black">
          Section Summary
        </h2>
        <table className="min-w-full divide-y divide-neutral-700">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3 pl-4 pr-3 text-center text-xs font-medium uppercase tracking-wide text-neutral-500 sm:pl-0"
              >
                Starting Point
              </th>
              <th
                scope="col"
                className="hidden py-3 pl-4 pr-3 text-center text-xs font-medium uppercase tracking-wide text-neutral-500 sm:block sm:pl-0"
              >
                Through
              </th>
              <th
                scope="col"
                className="py-3 pl-4 pr-3 text-center text-xs font-medium uppercase tracking-wide text-neutral-500 sm:pl-0"
              >
                Ending Point
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700 text-sm sm:text-base">
            {summary.map(({ startingPoint, endingPoint, id }, idx) => (
              <tr
                key={id}
                className={`${idx % 2 === 0 && "bg-neutral-700/10"}`}
              >
                <td className="whitespace-nowrap py-2 pl-4 pr-3 text-center font-medium text-neutral-900 sm:pl-0">
                  Measure {startingPoint.measure}, beat {startingPoint.beat}
                </td>
                <td className="hidden whitespace-nowrap py-2 pl-4 pr-3 text-center font-medium text-neutral-900 sm:block sm:pl-0">
                  —
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-center text-neutral-800">
                  Measure {endingPoint.measure}, beat {endingPoint.beat}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
