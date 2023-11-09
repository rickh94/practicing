import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState, useCallback } from "react";
import { ScaleCrossFadeContent } from "~/app/_components/transitions";
import { cn } from "~/lib/util";

type RepeatMode = "prepare" | "practice" | "break_success" | "break_fail";

export default function Repeat() {
  const [mode, setMode] = useState<RepeatMode>("prepare");
  const [startTime, setStartTime] = useState<number>(0);

  const startPracticing = useCallback(
    function () {
      setStartTime(Date.now());
      setMode("practice");
    },
    [setMode, setStartTime],
  );

  const setModePrepare = useCallback(
    function () {
      setMode("prepare");
    },
    [setMode],
  );

  const setModeBreakSuccess = useCallback(
    function () {
      setMode("break_success");
    },
    [setMode],
  );

  const setModeBreakFail = useCallback(
    function () {
      setMode("break_fail");
    },
    [setMode],
  );

  return (
    <div className="relative left-0 top-0 w-full sm:mx-auto sm:max-w-5xl">
      <ScaleCrossFadeContent
        component={
          {
            prepare: <RepeatPrepare startPracticing={startPracticing} />,
            practice: (
              <RepeatPractice
                startTime={startTime}
                onSuccess={setModeBreakSuccess}
                onFail={setModeBreakFail}
              />
            ),
            break_success: <RepeatBreakSuccess restart={setModePrepare} />,
            break_fail: <RepeatBreakFail restart={setModePrepare} />,
          }[mode]
        }
        id={mode}
      />
    </div>
  );
}

function RepeatPrepare({ startPracticing }: { startPracticing: () => void }) {
  return (
    <div className="flex w-full flex-col">
      <div>
        <h1 className="py-1 text-left text-2xl font-bold">Repeat Practicing</h1>
        <p className="text-left text-base">
          Repeat practicing is an important part of learning, but you need to do
          it carefully!
        </p>
        <h2 className="py-1 text-left text-xl font-bold">Prepare</h2>
        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
          <div className="prose prose-neutral rounded-xl bg-neutral-700/5 p-4 md:grid-cols-2">
            <h3 className="text-left text-xl">
              Answer these questions before you begin
            </h3>
            <ul className="text-lg">
              <li>
                Where <em className="italic">exactly</em> does your section
                start and stop?
              </li>
              <li>What makes it difficult?</li>
              <li>What will you think about prefore you play?</li>
              <li>What will you think about while you are playing?</li>
            </ul>
          </div>
          <div className="prose prose-neutral rounded-xl bg-neutral-700/5 p-4 md:grid-cols-2">
            <h3 className="text-left text-xl">How it works</h3>
            <ul className="text-lg">
              <li>The goal is to practice five times without a mistake.</li>
              <li>Practice as slowly as you need to be successful</li>
              <li>Take time between each repetition to reset.</li>
              <li>
                Avoid making things worse by taking a break if things aren’t
                going well.
              </li>
              <li>
                There’s a small timeout to keep you from going way too fast.
              </li>
              <li>When you’re ready, click the button below to get started.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-span-full my-16 flex w-full items-center justify-center">
        <button
          type="button"
          className="focusable rounded-xl bg-neutral-700/10 px-6 py-3 text-2xl font-bold text-neutral-900 transition duration-200 hover:bg-neutral-700/20 sm:px-8 sm:py-4 sm:text-4xl"
          onClick={startPracticing}
        >
          Start Practicing
        </button>
      </div>
    </div>
  );
}

function RepeatPractice({
  onSuccess,
  onFail,
  startTime,
}: {
  onSuccess: () => void;
  onFail: () => void;
  startTime: number;
}) {
  const [numCompleted, setCompleted] = useState(0);
  const [waitedLongEnough, setWaitedLongEnough] = useState(true);

  const succeed = useCallback(
    function () {
      if (numCompleted === 4) {
        setCompleted((curr) => curr + 1);
        setTimeout(onSuccess, 300);
      } else {
        setCompleted((curr) => curr + 1);
        setWaitedLongEnough(false);
        setTimeout(() => {
          setWaitedLongEnough(true);
        }, 1000);
      }
    },
    [numCompleted, onSuccess, setWaitedLongEnough],
  );

  const fail = useCallback(
    function () {
      setCompleted(0);
      setWaitedLongEnough(false);
      setTimeout(() => {
        setWaitedLongEnough(true);
      }, 1500);
      // if it's been more than five minutes + 30 seconds buffer, take a break
      if (Date.now() - startTime > 5 * 60 * 1000 + 30 * 1000) {
        onFail();
      }
    },
    [setCompleted, onFail, startTime],
  );

  return (
    <div className="flex w-full flex-col sm:mx-auto sm:max-w-3xl">
      <div className="flex w-full flex-col items-center sm:mx-auto sm:max-w-xl">
        <h2 className="text-center text-2xl font-semibold">Completions</h2>
        <ul className="my-4 grid grid-cols-5 gap-4">
          <PracticeListItem num={1} completed={numCompleted >= 1} />
          <PracticeListItem num={2} completed={numCompleted >= 2} />
          <PracticeListItem num={3} completed={numCompleted >= 3} />
          <PracticeListItem num={4} completed={numCompleted >= 4} />
          <PracticeListItem num={5} completed={numCompleted >= 5} />
        </ul>
      </div>
      <div className="flex w-full flex-col items-center pt-4 sm:mx-auto sm:max-w-xl">
        <p className="py-4 text-base">
          <strong className="font-semibold">Practice your spot</strong> Remember
          to go slow and pause between repetitions. Press the appropriate button
          below after each repetition.
        </p>
        <h2 className="text-center text-3xl font-semibold">How did it go?</h2>
        <div className="mx-auto my-8 flex w-full max-w-lg flex-wrap items-center justify-center gap-4 sm:mx-0 sm:w-auto sm:flex-row sm:gap-6">
          <div>
            <button
              disabled={!waitedLongEnough}
              className={cn(
                "focusable flex items-center justify-center gap-2 rounded-xl border-2 px-6 py-4 text-2xl font-semibold transition duration-200 ",
                waitedLongEnough
                  ? "border-red-700 bg-red-500/20 text-red-700 hover:bg-red-500/50"
                  : "pointer-events-none border-neutral-700 bg-red-800/30 text-neutral-700",
              )}
              type="button"
              onClick={fail}
            >
              <XMarkIcon className="-ml-1 h-6 w-6 sm:h-8 sm:w-8" />{" "}
              <span>Mistake</span>
            </button>
          </div>
          <button
            disabled={!waitedLongEnough}
            className={cn(
              "focusable flex items-center justify-center gap-2 rounded-xl border-2 px-6 py-4 text-2xl font-semibold transition duration-200 ",
              waitedLongEnough
                ? "border-green-700 bg-green-500/20 text-green-700 hover:bg-green-500/50"
                : "pointer-events-none border-neutral-700 bg-green-800/30 text-neutral-700",
            )}
            type="button"
            onClick={succeed}
          >
            <CheckIcon className="-ml-1 h-6 w-6 sm:h-8 sm:w-8" />{" "}
            <span>Correct</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function PracticeListItem({
  num,
  completed,
}: {
  num: number;
  completed: boolean;
}) {
  return (
    <li
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-all duration-100 sm:h-12 sm:w-12",
        completed
          ? "border-green-700  bg-green-500/50 text-green-700"
          : "border-neutral-700/10 bg-neutral-700/10 text-neutral-700/20 ",
      )}
    >
      {completed ? (
        <>
          <CheckIcon className="h-6 w-6 sm:h-8 sm:w-8" />{" "}
          <span className="sr-only">Checked</span>
        </>
      ) : (
        <div className="m-0 p-0 text-2xl font-bold ">{num}</div>
      )}
    </li>
  );
}

function RepeatBreakSuccess({ restart }: { restart: () => void }) {
  return (
    <div className="flex w-full flex-col items-center sm:mx-auto sm:max-w-3xl">
      <h1 className="py-1 text-center text-2xl font-bold">You did it!</h1>
      <p className="text-center text-base">
        Great job completing your five times in a row!
      </p>
      <div className="prose prose-neutral mt-8">
        <h3 className="text-left text-lg">What to do now?</h3>
        <p className="text-sm">Here are a few options for what to do next.</p>
        <ul>
          <li>
            Take a moment to reflect on what allowed you to do this successfully
            so you can recreate it in the future.
          </li>
          <li>Take a break to let your brain recover</li>
          <li>
            Play this spot again in a few minutes with the goal of playing it
            correctly on the first try.
          </li>
          <li>Add this spot to your random practicing.</li>
          <li>Repeat practice another spot.</li>
        </ul>
      </div>
      <div className="my-8 flex w-full flex-col justify-center gap-4 sm:flex-row sm:gap-6">
        <Link
          href="/practice/random-spots"
          className="focusable rounded-xl bg-amber-700/10 px-4 py-2 font-semibold text-amber-800 transition duration-200 hover:bg-amber-700/20"
          type="button"
        >
          Try Random Practicing
        </Link>
        <button
          className="focusable rounded-xl bg-emerald-700/10 px-4 py-2 font-semibold text-emerald-800 transition duration-200 hover:bg-emerald-700/20"
          type="button"
          onClick={restart}
        >
          Practice Another Spot
        </button>
      </div>
    </div>
  );
}

function RepeatBreakFail({ restart }: { restart: () => void }) {
  return (
    <div className="flex w-full flex-col items-center sm:mx-auto sm:max-w-3xl">
      <h1 className="py-1 text-center text-2xl font-bold">Time for a Break</h1>
      <p className="text-center text-base">
        You must put limits on your practicing so you don’t accidentally
        reinforce mistakes
      </p>
      <div className="prose prose-neutral mt-8">
        <h3 className="text-left text-lg">What to do now?</h3>
        <p className="text-sm">Here are a few options for what to do next.</p>
        <ul>
          <li>
            <strong className="font-semibold">Reflect</strong> on this spot
            <ul>
              <li>Is it a technical or mental problem holding you back?</li>
              <li>Could you slow down more and have more success?</li>
              <li>
                Are you taking long enough breaks between repetitions to
                reflect?
              </li>
              <li>Would this be better as two smaller spots?</li>
              <li>
                Is it worth returning to this today or should you wait until
                tomorrow?
              </li>
            </ul>
          </li>
          <li>
            <strong className="font-semibold">Take a break!</strong> It can be
            just a few minutes, or if you’re really frustrated, make it an hour.
          </li>
          <li>
            <strong className="font-semibold">Move on</strong> to another spot
            or piece.
          </li>
          <li>
            <strong className="font-semibold">Come back later</strong> when you
            have a plan to be more successful.{" "}
          </li>
        </ul>
      </div>
      <div className="my-8 flex w-full flex-col justify-center gap-4 sm:flex-row sm:gap-6">
        <Link
          href="/practice/random-spots"
          className="focusable rounded-xl bg-amber-700/10 px-4 py-2 font-semibold text-amber-800 transition duration-200 hover:bg-amber-700/20"
          type="button"
        >
          Try Random Practicing
        </Link>
        <button
          className="focusable rounded-xl bg-emerald-700/10 px-4 py-2 font-semibold text-emerald-800 transition duration-200 hover:bg-emerald-700/20"
          type="button"
          onClick={restart}
        >
          Practice Another Spot
        </button>
      </div>
    </div>
  );
}
