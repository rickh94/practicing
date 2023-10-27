import { Fragment } from "react";
import { workSans } from "~/app/_components/page-layout";
import { Dialog, Transition } from "@headlessui/react";

export default function Help({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
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
              <Dialog.Panel
                className={`relative transform overflow-hidden rounded-xl bg-gradient-to-t from-neutral-50 to-[#fff9ee] px-4 pb-4 pt-5 text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 ${workSans.className}`}
              >
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-neutral-900"
                    >
                      Random Practicing
                    </Dialog.Title>
                    <div className="prose prose-sm prose-neutral mt-2 text-left">
                      <p>
                        In order to maintain novelty for our distractable brains
                        and ensure even practicing amoung our different
                        sections, it’s very helpful to practice our spots in a
                        randomized order. To that end, we have two different
                        practicing modes available.
                      </p>
                      <h2>Modes</h2>
                      <dl>
                        <dt>Single Mode</dt>
                        <dd>
                          Random spots are selected one at a time and put up on
                          the screen. Click the button to advance. This will
                          continue indefinitely until you click done.
                        </dd>
                        <dt>Sequence Mode</dt>
                        <dd>
                          We will generate a sequence of spots so you don’t have
                          to stop and click between each one. It can either be
                          totally random or use each spot once before
                          continuing. You can check them off as you go, and it
                          will generate more as long as you want.
                        </dd>
                      </dl>
                      <p>
                        Select which mode you want using that tabs at the top.
                        If you want to switch modes, go back to setup to change.
                      </p>
                      <h2>Setup and Practicing</h2>
                      <p>
                        You’ll need to number your different spots, then select
                        how many you want to practice. The numbers will be
                        randomly generated from there.
                      </p>
                      <p>
                        When you’re done, you’ll get a table showing how many
                        times you practiced each different spot. You can return
                        to setup at any time, but your progress will be reset.
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
                    Done Reading
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
