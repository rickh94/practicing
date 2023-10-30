import { api } from "~/trpc/server";
import PieceCard from "~/app/_components/pieces/piece-card";

export default async function LibraryPieceList() {
  const recentPieces = await api.library.getRecentPieces.query();
  return (
    <>
      <h2 className="py-1 text-center text-2xl font-bold">Recent Pieces</h2>
      <div className="flex flex-col gap-4 p-4">
        {recentPieces.map((piece) => (
          <PieceCard key={piece.id} piece={piece} />
        ))}
      </div>
    </>
  );
}
