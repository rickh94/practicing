import CreatePieceForm from "./form";

export default function CreatePiece() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
          Create Piece
        </h1>
      </div>
      <div className="w-full sm:max-w-5xl">
        <CreatePieceForm />
      </div>
    </>
  );
}
