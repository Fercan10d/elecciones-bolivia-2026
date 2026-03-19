import Link from "next/link";
import { RaceWithCandidates } from "@/lib/types";
import { calculatePercentage } from "@/lib/utils";
import ProgressIndicator from "./ProgressIndicator";
import Image from "next/image";

interface RaceSummaryProps {
  race: RaceWithCandidates;
  basePath?: string;
}

export default function RaceSummary({ race, basePath = "" }: RaceSummaryProps) {
  const sortedCandidates = [...(race.candidates || [])].sort(
    (a, b) => b.votes - a.votes
  );
  const top3 = sortedCandidates.slice(0, 3);
  const totalVotes = race.votes_counted || sortedCandidates.reduce((sum, c) => sum + c.votes, 0);
  const href =
    race.type === "gobernador"
      ? `${basePath}/gobernadores/${race.id}`
      : `${basePath}/alcaldes/${race.id}`;

  return (
    <Link href={href} className="block group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full">
        <div className="px-4 py-3 border-b border-gray-50">
          <h3 className="font-bold text-[var(--color-elpost-primary)] group-hover:text-[var(--color-elpost-accent)] transition-colors">
            {race.location_name}
          </h3>
          <ProgressIndicator
            actasCounted={race.actas_counted}
            actasTotal={race.actas_total}
          />
        </div>

        <div className="px-4 py-3 space-y-2">
          {top3.length === 0 ? (
            <p className="text-sm text-[var(--color-elpost-muted)] py-2 text-center">
              Pendiente
            </p>
          ) : (
            top3.map((candidate, index) => {
              const pct = calculatePercentage(candidate.votes, totalVotes);
              return (
                <div key={candidate.id} className="flex items-center gap-2">
                  {/* Mini foto o inicial */}
                  <div className="w-6 h-6 flex-shrink-0 rounded-full overflow-hidden">
                    {candidate.photo_url ? (
                      <Image
                        src={candidate.photo_url}
                        alt={candidate.candidate_name}
                        width={24}
                        height={24}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-white text-[10px] font-bold"
                        style={{ backgroundColor: candidate.party_color }}
                      >
                        {candidate.candidate_name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <span
                        className={`truncate ${index === 0 ? "font-semibold" : ""}`}
                      >
                        {candidate.party_acronym || candidate.party_name}
                      </span>
                      <span className="font-bold ml-1">{pct}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${Math.max(pct, 1)}%`,
                          backgroundColor: candidate.party_color,
                          opacity: index === 0 ? 1 : 0.6,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {sortedCandidates.length > 3 && (
            <p className="text-xs text-[var(--color-elpost-muted)] text-center pt-1">
              +{sortedCandidates.length - 3} más
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
