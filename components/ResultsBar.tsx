import { Candidate } from "@/lib/types";
import { calculatePercentage, formatNumber } from "@/lib/utils";
import Image from "next/image";

interface ResultsBarProps {
  candidate: Candidate;
  totalVotes: number;
  isLeader: boolean;
}

export default function ResultsBar({
  candidate,
  totalVotes,
  isLeader,
}: ResultsBarProps) {
  const percentage = calculatePercentage(candidate.votes, totalVotes);

  return (
    <div className={`flex items-center gap-3 py-2 ${isLeader ? "font-semibold" : ""}`}>
      {/* Foto del candidato (opcional) */}
      <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
        {candidate.photo_url ? (
          <Image
            src={candidate.photo_url}
            alt={candidate.candidate_name}
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: candidate.party_color }}
          >
            {candidate.candidate_name.charAt(0)}
          </div>
        )}
      </div>

      {/* Info del candidato */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: candidate.party_color }}
            />
            <span className="text-sm truncate">
              {candidate.candidate_name}
            </span>
            <span className="text-xs text-[var(--color-elpost-muted)] flex-shrink-0">
              {candidate.party_acronym || candidate.party_name}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <span className="text-sm font-bold">{percentage}%</span>
            <span className="text-xs text-[var(--color-elpost-muted)]">
              {formatNumber(candidate.votes)}
            </span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.max(percentage, 0.5)}%`,
              backgroundColor: candidate.party_color,
              opacity: isLeader ? 1 : 0.7,
            }}
          />
        </div>
      </div>
    </div>
  );
}
