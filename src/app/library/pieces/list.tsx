import PieceCard from "~/app/_components/pieces/piece-card";
import { api } from "~/trpc/server";

export default async function PieceList({ page }: { page: number }) {
  const selectedPieces = await api.library.getPaginatedPieces.query({
    page,
  });
  return (
    <div className="grid w-full grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2">
      {selectedPieces.map((piece) => (
        <PieceCard key={piece.id} piece={piece} />
      ))}
    </div>
  );
}
