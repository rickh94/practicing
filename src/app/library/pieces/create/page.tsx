import Breadcrumbs from "~/app/_components/breadcrumb";
import CreatePieceForm from "./form";

export default function CreatePiece() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
          Create Piece
        </h1>
      </div>
      <div className="-mb-4 flex w-full items-center justify-start sm:container">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Library", href: "/library" },
            { label: "Pieces", href: "/library/pieces" },
            { label: "New", href: "/library/pieces/create", active: true },
          ]}
        />
      </div>
      <div className="w-full sm:mx-auto sm:max-w-6xl">
        <CreatePieceForm />
      </div>
    </>
  );
}
