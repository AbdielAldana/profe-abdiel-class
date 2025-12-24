export const getLevelData = (xpTotal = 0, options = {}) => {
  const LEVEL_CAP = options.levelCap ?? 50;

  // Curva lineal por nivel (ajustable)
  // L=1 => aprox 333, L=49 => aprox 3396 con tu fórmula /24
  const costForLevel =
    options.costForLevel ??
    ((L) => Math.round((8000 + (L - 1) * 1500) / 24));

  let level = 1;
  let xpStart = 0;
  let cost = costForLevel(1);

  for (let L = 1; L <= LEVEL_CAP; L++) {
    const c = costForLevel(L);
    const xpNext = xpStart + c;

    if (xpTotal < xpNext || L === LEVEL_CAP) {
      level = L;
      cost = c;
      break;
    }

    xpStart = xpNext;
  }

  const earnedInLevel = Math.max(0, xpTotal - xpStart);
  const xpFaltante = Math.max(0, cost - earnedInLevel);
  const progreso = cost > 0 ? Math.round((earnedInLevel / cost) * 100) : 0;

  return {
    level,
    xpTotal,
    xpStart,
    cost, // xp necesaria para subir al siguiente nivel desde este
    earnedInLevel,
    xpFaltante,
    progreso: Math.max(0, Math.min(100, progreso)),
  };
};
