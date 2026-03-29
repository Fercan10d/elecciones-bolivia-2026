export function calculatePercentage(votes: number, totalVotes: number): number {
  if (totalVotes === 0) return 0;
  return Math.round((votes / totalVotes) * 1000) / 10;
}

export function formatNumber(num: number): string {
  return num.toLocaleString("es-BO");
}

export function getActasPercentage(counted: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((counted / total) * 10000) / 100;
}
