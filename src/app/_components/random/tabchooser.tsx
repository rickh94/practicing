import { Fragment, useCallback, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import SingleTab from "~/app/_components/random/single";
import SequenceTab from "~/app/_components/random/sequence";
import { type RandomMode } from "~/lib/random";
import { workSans } from "../page-layout";

const variants = {
  single: {
    initial: {
      x: "-100%",
      opacity: 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { bounce: 0, duration: 0.2 },
    },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.2, bounce: 0 } },
  },
  sequence: {
    initial: {
      x: "100%",
      opacity: 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { bounce: 0, duration: 0.2 },
    },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.2, bounce: 0 } },
  },
};

// TODO: switch to react framer motion
export default function TabChooser() {
  const [tab, setTab] = useState<"single" | "sequence">("single");
  const [mode, setMode] = useState<RandomMode>("setup");
  const [confirmChangeTabOpen, setConfirmChangeTabOpen] = useState(false);

  const handleSetTab = useCallback(
    (nextTab: "single" | "sequence") => {
      if (mode !== "setup" && nextTab !== tab) {
        setConfirmChangeTabOpen(true);
        return;
      }
      setTab(nextTab);
    },
    [setConfirmChangeTabOpen, mode, tab],
  );

  return (
    <>
      <div className="container relative mx-auto flex flex-col px-2">
        <div className="flex w-full items-center justify-center rounded-xl bg-neutral-700/10 p-1 sm:mx-auto sm:max-w-lg">
          <button
            type="button"
            className={`w-1/2 rounded-xl py-2 transition-all duration-200 ${
              tab === "single" && "bg-neutral-700/20 font-semibold text-black"
            }`}
            onClick={() => handleSetTab("single")}
          >
            Single
          </button>
          <button
            type="button"
            className={`w-1/2 rounded-xl py-2 transition-all duration-200 ${
              tab === "sequence" && "bg-neutral-700/20 font-semibold text-black"
            }`}
            onClick={() => handleSetTab("sequence")}
          >
            Sequence
          </button>
        </div>
        <Content
          component={
            tab === "single" ? (
              <SingleTab mode={mode} setMode={setMode} />
            ) : (
              <SequenceTab mode={mode} setMode={setMode} />
            )
          }
          id={tab}
        />
      </div>
      <Transition.Root show={confirmChangeTabOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setConfirmChangeTabOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="back fixed inset-0 bg-neutral-800/30 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className={`relative transform overflow-hidden rounded-xl bg-gradient-to-t from-neutral-50 to-[#fff9ee] px-4 pb-4 pt-5 text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 ${workSans.className}`}
                >
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-semibold leading-6 text-neutral-900"
                      >
                        Change to{" "}
                        {tab === "single" ? "Sequence" : "Single Spot"}{" "}
                        Practicing
                      </Dialog.Title>
                      <div className="prose prose-sm prose-neutral mt-2 text-center">
                        Changing practice modes now will lose your progress and
                        spots and send you back to the setup screen. Are you
                        sure?
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex gap-4 px-2 sm:mt-6">
                    <button
                      type="button"
                      className="focusable block w-full rounded-xl bg-amber-800/20 px-4 py-2 text-lg font-semibold text-amber-700 hover:bg-amber-800/30"
                      onClick={() => setConfirmChangeTabOpen(false)}
                    >
                      No, Cancel
                    </button>
                    <button
                      type="button"
                      className="focusable block w-full rounded-xl bg-rose-800/20 px-4 py-2 text-lg font-semibold text-rose-700 hover:bg-rose-800/30"
                      onClick={() => {
                        setTab(tab === "single" ? "sequence" : "single");
                        setMode("setup");
                        setConfirmChangeTabOpen(false);
                      }}
                    >
                      Yes, Change
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

function Content({
  component,
  id,
}: {
  component: React.ReactNode;
  id: "single" | "sequence";
}) {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        className="relative"
        key={id}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants[id]}
      >
        {component}
      </motion.div>
    </AnimatePresence>
  );
}
