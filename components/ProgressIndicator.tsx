import { getActasPercentage } from "@/lib/utils";

interface ProgressIndicatorProps {
  actasCounted: number;
  actasTotal: number;
}

export default function ProgressIndicator({
  actasCounted,
  actasTotal,
}: ProgressIndicatorProps) {
  const percentage = getActasPercentage(actasCounted, actasTotal);

  if (actasTotal === 0) {
    return (
      <span className="text-xs text-[var(--color-elpost-muted)]">
        Pendiente
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--color-elpost-accent)] rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-[var(--color-elpost-muted)] whitespace-nowrap">
        {percentage}% actas
      </span>
    </div>
  );
}
