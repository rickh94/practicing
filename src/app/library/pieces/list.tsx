import { TwoColumnPageContainer } from "~/app/_components/containers";
import PieceCard from "~/app/_components/pieces/piece-card";
import { api } from "~/trpc/server";

export default async function PieceList({ page }: { page: number }) {
  const selectedPieces = await api.library.getPaginatedPieces.query({
    page,
  });
  return (
    <TwoColumnPageContainer>
      {selectedPieces.map((piece) => (
        <PieceCard key={piece.id} piece={piece} />
      ))}
    </TwoColumnPageContainer>
  );
}
