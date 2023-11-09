import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "~/app/_components/breadcrumb";
import { api } from "~/trpc/server";
import {
  AudioPromptReveal,
  ImagePromptReveal,
  NotesPromptReveal,
  TextPromptReveal,
} from "./prompts";
import {
  BreadcrumbContainer,
  NarrowPageContainer,
} from "~/app/_components/containers";

// TODO: figure out how to delete files from uploadthing on delete
// TODO: implement edit and delete for spots
export default async function Page({
  params,
}: {
  params: {
    id: string;
    spotId: string;
  };
}) {
  const spot = await api.library.getSpotById.query({
    spotId: params.spotId,
    pieceId: params.id,
  });
  if (!spot) {
    return notFound();
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800 sm:text-5xl">
          {spot.piece.title}
        </h1>
      </div>
      <BreadcrumbContainer>
        <div className="flex">
          <Breadcrumbs
            breadcrumbs={[
              { label: "Library", href: "/library" },
              { label: "Pieces", href: "/library/pieces" },
              {
                label: spot.piece.title,
                href: `/library/pieces/${spot.piece.id}`,
              },
              {
                label: spot.name,
                href: `/library/pieces/${spot.piece.id}/spots/${spot.id}`,
                active: true,
              },
            ]}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Link
            href={`/library/pieces/${spot.piece.id}/spots/${spot.id}/edit`}
            className="focusable flex items-center justify-center gap-1 rounded-xl bg-amber-700/10 px-4 py-2 font-semibold text-amber-800  transition duration-200 hover:bg-amber-700/20"
          >
            <PencilIcon className="h-6 w-6" />
            Edit
          </Link>
          <button
            type="button"
            className="focusable flex items-center justify-center gap-1 rounded-xl bg-red-700/10 px-4 py-2 font-semibold text-red-800  transition duration-200 hover:bg-red-700/20"
          >
            <TrashIcon className="h-6 w-6" />
            Delete
          </button>
        </div>
      </BreadcrumbContainer>
      <NarrowPageContainer>
        <div className="grid w-full grid-cols-1 gap-4 rounded-xl border border-neutral-500 bg-white/80 p-4 text-neutral-900 sm:grid-cols-3">
          <div className="col-span-full flex justify-center text-center">
            <h2 className="border-b-2 border-neutral-500 px-4 text-2xl font-bold">
              {spot.name}
            </h2>
          </div>

          <div>
            <dl className="divide-y divide-neutral-700 border-y border-neutral-700 text-base">
              <div className="px-4 py-2 sm:flex sm:justify-between sm:px-0">
                <dt className="font-medium leading-6 text-neutral-900">
                  Order
                </dt>
                <dd className="mt-1 leading-6 text-neutral-700 sm:mt-0">
                  {spot.order ?? "Unordered"}
                </dd>
              </div>
              <div className="px-4 py-2 sm:flex sm:justify-between sm:px-0">
                <dt className="font-medium leading-6 text-neutral-900">
                  Measures
                </dt>
                <dd className="mt-1 leading-6 text-neutral-700 sm:mt-0">
                  {spot.measures}
                </dd>
              </div>
            </dl>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <AudioPromptReveal audioPromptUrl={spot.audioPromptUrl} />
            <TextPromptReveal textPrompt={spot.textPrompt} />
            <NotesPromptReveal notesPrompt={spot.notesPrompt} />
            <ImagePromptReveal imagePromptUrl={spot.imagePromptUrl} />
          </div>
        </div>
      </NarrowPageContainer>
    </>
  );
}
