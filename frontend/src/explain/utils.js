export const getScoreRingColor = (score) => {
  if (score >= 800) return 'bg-emerald-500/20 ring-emerald-400';
  if (score >= 740) return 'bg-green-500/20 ring-green-400';
  if (score >= 670) return 'bg-lime-400/20 ring-lime-400';
  if (score >= 580) return 'bg-yellow-400/20 ring-yellow-400';
  return 'bg-red-500/20 ring-red-400';
};
