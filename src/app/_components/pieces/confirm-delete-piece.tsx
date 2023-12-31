"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useRef, useState } from "react";
import { workSans } from "../page-layout";
import { TrashIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AngryButton, WarningButton } from "@ui/buttons";

export default function ConfirmDeletePiece({
  pieceId,
  title,
}: {
  pieceId: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteTextRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { mutate } = api.library.deletePieceById.useMutation({
    onSuccess: () => {
      setOpen(false);
      setError(null);
      toast.success("Piece deleted!");
      router.refresh();
      router.push("/library/pieces");
    },
    onError: () => {
      setError("Could not delete piece");
    },
  });

  const handleDelete = useCallback(() => {
    if (deleteTextRef.current?.value === `Delete ${title}`) {
      mutate({ id: pieceId });
      setError(null);
    } else {
      setError(`Please type “Delete ${title}” to confirm.`);
    }
  }, [mutate, deleteTextRef, title, pieceId]);

  return (
    <>
      <AngryButton
        onClick={() => {
          setOpen(true);
        }}
      >
        <TrashIcon className="-ml-1 h-5 w-5" />
        Delete
      </AngryButton>
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
                  className={`relative transform overflow-hidden rounded-xl bg-gradient-to-t from-neutral-50 to-[#fff9ee] px-4 pb-4 pt-5 text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 ${workSans.className}`}
                >
                  <div>
                    <div className="text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-semibold leading-6 text-neutral-900"
                      >
                        Delete Piece
                      </Dialog.Title>
                      <div className="prose prose-sm prose-neutral mt-2 text-left">
                        <p>
                          Deleting a piece will also delete all spots associated
                          with the piece and cannot be reversed.
                        </p>
                        <p>
                          Confirm you really want to do this by typing:{" "}
                          <strong className="rounded font-mono font-bold text-red-500">
                            Delete {title}
                          </strong>
                        </p>
                        {!!error && (
                          <p className="italic text-red-500">{error}</p>
                        )}
                        <input
                          type="text"
                          id="confirm-delete"
                          ref={deleteTextRef}
                          autoComplete="off"
                          placeholder={`Delete ${title}`}
                          className="focusable w-full rounded-xl bg-red-700/10 px-4 py-2 font-semibold text-red-500 placeholder-red-700/50 transition duration-200 focus:bg-red-700/20"
                          onKeyUp={(e) => {
                            if (e.key === "Enter") {
                              handleDelete();
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex gap-4 px-2 sm:mt-6">
                    <WarningButton onClick={() => setOpen(false)} grow>
                      <XMarkIcon className="-ml-1 h-6 w-6" />
                      No, Cancel
                    </WarningButton>
                    <AngryButton onClick={handleDelete} grow>
                      <TrashIcon className="-ml-1 h-6 w-6" />
                      Yes, Delete
                    </AngryButton>
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
