import { Fragment, useState } from "react";
import { PageColumnLayout } from "~/components/layout";
import { Dialog, Transition } from "@headlessui/react";
import SingleTab from "~/components/random/single";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function Random() {
  // TODO: fix back button so it scrolls off
  return (
    <>
      <PageColumnLayout
        backLink={true}
        backLinkTo={"/"}
        backLinkText="Back Home"
      >
        <Help />
        <div className="flex items-center justify-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
            Practice Randomizer
          </h1>
        </div>
        <TabChooser />
      </PageColumnLayout>
    </>
  );
}
export type RandomMode = "setup" | "practice" | "summary";

function TabChooser() {
  const [tab, setTab] = useState<"single" | "sequence">("single");
  const [mode, setMode] = useState<RandomMode>("setup");
  return (
    <>
      <div className="container relative mx-auto flex flex-col gap-8 px-2">
        {/* TODO: make an expandable help element */}
        <Transition
          show={mode === "setup"}
          enter="transition ease-out transform duration-200 delay-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in transform duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="absolute left-1/2 top-0 flex w-full -translate-x-1/2 transform items-center justify-center"
          unmount={false}
        >
          <div className="flex w-full items-center justify-center rounded-xl bg-neutral-700/10 p-1 sm:max-w-lg">
            <button
              type="button"
              className={`w-1/2 rounded-xl py-2 transition-all duration-200 ${tab === "single" && "bg-neutral-700/20 font-semibold text-black"
                }`}
              onClick={() => setTab("single")}
            >
              Single
            </button>
            <button
              type="button"
              className={`w-1/2 rounded-xl py-2 transition-all duration-200 ${tab === "sequence" &&
                "bg-neutral-700/20 font-semibold text-black"
                }`}
              onClick={() => setTab("sequence")}
            >
              Sequence
            </button>
          </div>
        </Transition>
        <div className="h-8" />
        <div className="relative">
          <SingleTab show={tab === "single"} mode={mode} setMode={setMode} />
          <SequenceTab show={tab === "sequence"} />
        </div>
      </div>
    </>
  );
}

function SequenceTab({ show }: { show: boolean }) {
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
      {/* TODO: create the sequence view with a configuration and a nice interface to check off spots */}
      <div className="absolute left-0 top-0 w-full">
        <h1 className="py-1 text-2xl font-bold text-neutral-700">
          Sequences (coming soon)
        </h1>
      </div>
    </Transition>
  );
}

function Help() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="absolute right-0 top-0 p-4">
        <button
          type="button"
          className="focusable block rounded-xl bg-neutral-700/10 px-6 py-4 font-semibold text-neutral-700 hover:bg-neutral-700/20"
          onClick={() => setOpen(true)}
        >
          <span className="flex items-center gap-1">
            <span>Read More</span>
            <InformationCircleIcon className="inline h-6 w-6" />
          </span>
        </button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-[#fff9ee] px-4 pb-4 pt-5 text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-semibold leading-6 text-gray-900"
                      >
                        Random Practicing
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {/* TODO: write this */}
                          More info soon
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 px-2 sm:mt-6">
                    <button
                      type="button"
                      className="focusable block w-full rounded-xl bg-neutral-800/20 px-6 py-2 text-xl font-semibold text-neutral-700 hover:bg-neutral-800/30"
                      onClick={() => setOpen(false)}
                    >
                      Done
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
