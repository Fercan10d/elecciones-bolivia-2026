import { RaceWithCandidates } from "@/lib/types";
import ResultsBar from "./ResultsBar";
import ProgressIndicator from "./ProgressIndicator";
import { formatNumber } from "@/lib/utils";

interface RaceCardProps {
  race: RaceWithCandidates;
}

export default function RaceCard({ race }: RaceCardProps) {
  const sortedCandidates = [...(race.candidates || [])].sort(
    (a, b) => b.votes - a.votes
  );
  // Porcentajes se calculan solo con votos válidos (sin blancos ni nulos)
  const totalVotes = race.votes_counted || sortedCandidates.reduce((sum, c) => sum + c.votes, 0);
  const totalEmitidos = totalVotes + (race.votos_blancos || 0) + (race.votos_nulos || 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-[var(--color-elpost-primary)]">
            {race.location_name}
          </h3>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-[var(--color-elpost-muted)] capitalize">
            {race.type}
          </span>
        </div>
        <ProgressIndicator
          actasCounted={race.actas_counted}
          actasTotal={race.actas_total}
        />
      </div>

      <div className="px-5 py-3">
        {sortedCandidates.length === 0 ? (
          <p className="text-sm text-[var(--color-elpost-muted)] py-4 text-center">
            Resultados pendientes
          </p>
        ) : (
          sortedCandidates.map((candidate, index) => (
            <ResultsBar
              key={candidate.id}
              candidate={candidate}
              totalVotes={totalVotes}
              isLeader={index === 0 && candidate.votes > 0}
            />
          ))
        )}
      </div>

      {/* Votos blancos y nulos */}
      {(race.votos_blancos > 0 || race.votos_nulos > 0) && (
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <div className="grid grid-cols-2 gap-2 text-sm text-[var(--color-elpost-muted)]">
            <div className="flex items-center gap-1">
              <span>Blancos:</span>
              <span className="font-semibold">{formatNumber(race.votos_blancos)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Nulos:</span>
              <span className="font-semibold">{formatNumber(race.votos_nulos)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Válidos:</span>
              <span className="font-semibold">{formatNumber(totalVotes)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Emitidos:</span>
              <span className="font-semibold">{formatNumber(totalEmitidos)}</span>
            </div>
          </div>
        </div>
      )}

      {race.updated_at && race.actas_counted > 0 && (
        <div className="px-5 py-2 border-t border-gray-50">
          <p className="text-xs text-[var(--color-elpost-muted)]">
            Actualizado:{" "}
            {new Date(race.updated_at).toLocaleTimeString("es-BO", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "America/La_Paz",
            })}
          </p>
        </div>
      )}
    </div>
  );
}
