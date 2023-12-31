import {
  ArrowDownRightIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback } from "react";
import { ScaleCrossFadeContent } from "@ui/transitions";
import { RepeatPrepareText } from "./repeat-prepare-text";
import { type BasicSpot } from "~/lib/validators/library";
import {
  AudioPromptReveal,
  TextPromptReveal,
  NotesPromptReveal,
  ImagePromptReveal,
} from "~/app/_components/spot-prompts";
import {
  BigAngryButton,
  BigHappyButton,
  GiantBasicButton,
  HappyButton,
  WarningButton,
} from "@ui/buttons";
import { BackToPieceLink, HappyLink, WarningLink } from "@ui/links";

type RepeatMode = "prepare" | "practice" | "break_success" | "break_fail";

export default function Repeat({
  onCompleted,
  pieceHref,
  spot,
}: {
  onCompleted?: (successful: boolean) => void;
  pieceHref?: string;
  spot?: BasicSpot;
}) {
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
      onCompleted?.(true);
      setMode("break_success");
    },
    [setMode, onCompleted],
  );

  const setModeBreakFail = useCallback(
    function () {
      onCompleted?.(true);
      setMode("break_fail");
    },
    [setMode, onCompleted],
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
                spot={spot}
              />
            ),
            break_success: (
              <RepeatBreakSuccess
                restart={setModePrepare}
                pieceHref={pieceHref}
              />
            ),
            break_fail: (
              <RepeatBreakFail restart={setModePrepare} pieceHref={pieceHref} />
            ),
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
      <RepeatPrepareText />
      <div className="col-span-full my-16 flex w-full items-center justify-center">
        <GiantBasicButton
          type="button"
          className="focusable rounded-xl bg-neutral-700/10 px-6 py-3 text-2xl font-bold text-neutral-900 transition duration-200 hover:bg-neutral-700/20 sm:px-8 sm:py-4 sm:text-4xl"
          onClick={startPracticing}
        >
          Start Practicing
        </GiantBasicButton>
      </div>
    </div>
  );
}

function RepeatPractice({
  onSuccess,
  onFail,
  startTime,
  spot,
}: {
  onSuccess: () => void;
  onFail: () => void;
  startTime: number;
  spot?: BasicSpot;
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
    <>
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
            <strong className="font-semibold">Practice your spot</strong>{" "}
            Remember to go slow and pause between repetitions. Press the
            appropriate button below after each repetition.
          </p>
          <h2 className="text-center text-3xl font-semibold">How did it go?</h2>
          <div className="mx-auto my-8 flex w-full max-w-lg flex-wrap items-center justify-center gap-4 sm:mx-0 sm:w-auto sm:flex-row sm:gap-6">
            <div>
              <BigAngryButton disabled={!waitedLongEnough} onClick={fail}>
                <XMarkIcon className="-ml-1 h-6 w-6 sm:h-8 sm:w-8" />{" "}
                <span>Mistake</span>
              </BigAngryButton>
            </div>
            <BigHappyButton disabled={!waitedLongEnough} onClick={succeed}>
              <CheckIcon className="-ml-1 h-6 w-6 sm:h-8 sm:w-8" />{" "}
              <span>Correct</span>
            </BigHappyButton>
          </div>
        </div>
      </div>
      {spot && (
        <div className="flex flex-col gap-2 sm:mx-auto sm:max-w-xl">
          <AudioPromptReveal audioPromptUrl={spot.audioPromptUrl} />
          <TextPromptReveal textPrompt={spot.textPrompt} />
          <NotesPromptReveal notesPrompt={spot.notesPrompt} />
          <ImagePromptReveal imagePromptUrl={spot.imagePromptUrl} />
        </div>
      )}

      <div className="flex w-full flex-col py-24 sm:mx-auto sm:max-w-3xl">
        <div className="mx-auto flex w-full max-w-lg flex-wrap items-center justify-center">
          <WarningButton onClick={onFail}>
            <ArrowDownRightIcon className="-ml-1 h-6 w-6 sm:h-8 sm:w-8" />{" "}
            <span>Move On</span>
          </WarningButton>
        </div>
      </div>
    </>
  );
}

const variants = {
  initial: {
    scale: 1.1,
  },
  animate: {
    scale: 1,
    transition: { bounce: 0, duration: 0.1 },
  },
  exit: {
    scale: 1.1,
    transition: { duration: 0.1, bounce: 0 },
  },
};

function PracticeListItem({
  num,
  completed,
}: {
  num: number;
  completed: boolean;
}) {
  return (
    <AnimatePresence initial={false} mode="wait">
      {completed ? (
        <motion.li
          className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-green-700 bg-green-500/50 text-green-700 transition-all duration-100  sm:h-12 sm:w-12"
          key={`${num}-completed`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
        >
          <CheckIcon className="h-6 w-6 sm:h-8 sm:w-8" />{" "}
          <span className="sr-only">Checked</span>
        </motion.li>
      ) : (
        <motion.li
          className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-neutral-700/10 bg-neutral-700/10 text-neutral-700/20 transition-all duration-100 sm:h-12 sm:w-12 "
          key={`${num}-incomplete`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
        >
          <div className="m-0 p-0 text-2xl font-bold ">{num}</div>
        </motion.li>
      )}
    </AnimatePresence>
  );
}

function RepeatBreakSuccess({
  restart,
  pieceHref,
}: {
  restart: () => void;
  pieceHref?: string;
}) {
  return (
    <div className="flex w-full flex-col items-center sm:mx-auto sm:max-w-3xl">
      <h1 className="py-1 text-center text-2xl font-bold">You did it!</h1>
      <p className="text-center text-base">
        Great job completing your five times in a row!
      </p>
      <div className="my-8 flex w-full flex-col justify-center gap-4 sm:flex-row sm:gap-6">
        {pieceHref && <BackToPieceLink pieceHref={pieceHref} />}
        <WarningLink href="/practice/random-spots">
          Try Random Practicing
        </WarningLink>
        {pieceHref ? (
          <HappyLink href={`${pieceHref}/practice/repeat`}>
            Practice Another Spot
          </HappyLink>
        ) : (
          <HappyButton onClick={restart}>Practice Another Spot</HappyButton>
        )}
      </div>
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
    </div>
  );
}

function RepeatBreakFail({
  restart,
  pieceHref,
}: {
  restart: () => void;
  pieceHref?: string;
}) {
  return (
    <div className="flex w-full flex-col items-center sm:mx-auto sm:max-w-3xl">
      <h1 className="py-1 text-center text-2xl font-bold">Time for a Break</h1>
      <p className="text-center text-base">
        You must put limits on your practicing so you don’t accidentally
        reinforce mistakes
      </p>
      <div className="my-8 flex w-full flex-col justify-center gap-4 sm:flex-row sm:gap-6">
        {pieceHref && <BackToPieceLink pieceHref={pieceHref} />}
        <WarningLink href="/practice/random-spots">
          Try Random Practicing
        </WarningLink>
        {pieceHref ? (
          <HappyLink href={`${pieceHref}/practice/repeat`}>
            Practice Another Spot
          </HappyLink>
        ) : (
          <HappyButton onClick={restart}>Practice Another Spot</HappyButton>
        )}
      </div>
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
    </div>
  );
}
