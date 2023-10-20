import { useState } from "react";
import { Transition } from "@headlessui/react";
import RadioBox from "~/components/radio";

export function SingleMode({ show }: { show: boolean }) {
  const [numSpots, setNumSpots] = useState(1);
  const [useAnimation, setUseAnimation] = useState(true);
  const [mode, setMode] = useState<"setup" | "practice">("setup");
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
      <div className="absolute left-0 top-0 w-full">
        <Transition
          show={mode === "setup"}
          enter="transition ease-out transform duration-200 delay-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in transform duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <SingleSetupForm
            numSpots={numSpots}
            setNumSpots={setNumSpots}
            useAnimation={useAnimation}
            setUseAnimation={setUseAnimation}
            submit={() => setMode("practice")}
          />
        </Transition>
        <Transition
          show={mode === "practice"}
          enter="transition ease-out transform duration-200 delay-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in transform duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <SinglePractice
            numSpots={numSpots}
            useAnimation={useAnimation}
            setup={() => setMode("setup")}
          />
        </Transition>
      </div>
    </Transition>
  );
}

function SingleSetupForm({
  numSpots,
  setNumSpots,
  useAnimation,
  setUseAnimation,
  submit,
}: {
  numSpots: number;
  setNumSpots: (numSpots: number) => void;
  useAnimation: boolean;
  setUseAnimation: (useAnimation: boolean) => void;
  submit: () => void;
}) {
  return (
    <div className="absolute left-0 top-0 w-full">
      <div className="py-2">
        <h1 className="py-1 text-2xl font-bold">Single Random Spots</h1>
        <p className="text-lg">
          Generates random spots to practice one at a time with an optional
          animation.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
            Use Spinner animation
          </label>
          <p className="pb-2 text-sm text-neutral-700">
            There is a wheel-of-fortune style spinner available that can play
            each time, or you can skip it and just have the number appear on
            screen.
          </p>
          <div className="flex w-full gap-2">
            {/* TODO: fix ring, border outline, add no*/}
            <RadioBox
              text="Yes"
              setSelected={() => setUseAnimation(true)}
              selected={useAnimation}
              value="yes"
              name="animation"
            />
            <RadioBox
              text="No"
              setSelected={() => setUseAnimation(false)}
              selected={!useAnimation}
              value="no"
              name="animation"
            />
          </div>
        </div>
        <div className="col-span-full my-16 flex w-full items-center justify-center">
          <button
            type="button"
            className="focusable rounded-xl bg-neutral-700/10 px-8 py-4 text-4xl font-bold text-neutral-800 transition duration-200 hover:bg-neutral-700/20"
            onClick={submit}
          >
            Start Practicing
          </button>
        </div>
      </div>
    </div>
  );
}

function SinglePractice({
  numSpots,
  useAnimation,
  setup,
}: {
  numSpots: number;
  useAnimation: boolean;
  setup: () => void;
}) {
  return (
    <div className="absolute left-0 top-0 w-full">
      <div className="py-2">
        <h1 className="py-1 text-2xl font-bold">Practicing Spots</h1>
        <p>number of spots: {numSpots}</p>
        <p>use animation: {useAnimation ? "Yes" : "No"}</p>
        <button onClick={setup}>Back to setup</button>
      </div>
    </div>
  );
}
