// Calcula nivel, progreso y XP restante a partir de la XP total
export const getLevelData = (xpTotal = 0, options = {}) => {

  // ============================
  // CONFIGURACIÓN GENERAL
  // ============================

  // Nivel máximo permitido (default: 50)
  const LEVEL_CAP = options.levelCap ?? 50;

  // Función que define cuánta XP cuesta subir cada nivel
  // L = nivel actual
  // Ejemplo:
  // Nivel 1  -> ~333 XP
  // Nivel 49 -> ~3396 XP
  const costForLevel =
    options.costForLevel ??
    ((L) => Math.round((8000 + (L - 1) * 1500) / 24));

  // ============================
  // VARIABLES DE CÁLCULO
  // ============================

  let level = 1;          // Nivel actual del usuario
  let xpStart = 0;        // XP acumulada necesaria para llegar a este nivel
  let cost = costForLevel(1); // XP necesaria para subir al siguiente nivel

  // ============================
  // DETERMINAR NIVEL ACTUAL
  // ============================

  for (let L = 1; L <= LEVEL_CAP; L++) {

    // XP que cuesta subir del nivel L al siguiente
    const c = costForLevel(L);

    // XP total necesaria para llegar al siguiente nivel
    const xpNext = xpStart + c;

    // Si la XP total del usuario no alcanza para el siguiente nivel
    // o ya se llegó al nivel máximo
    if (xpTotal < xpNext || L === LEVEL_CAP) {
      level = L;   // Nivel actual
      cost = c;    // XP que cuesta subir desde este nivel
      break;
    }

    // Si sí alcanzó, acumulamos XP y seguimos al siguiente nivel
    xpStart = xpNext;
  }

  // ============================
  // PROGRESO DENTRO DEL NIVEL
  // ============================

  // XP ganada dentro del nivel actual
  const earnedInLevel = Math.max(0, xpTotal - xpStart);

  // XP que falta para subir al siguiente nivel
  const xpFaltante = Math.max(0, cost - earnedInLevel);

  // Porcentaje de progreso del nivel (0 a 100)
  const progreso =
    cost > 0
      ? Math.round((earnedInLevel / cost) * 100)
      : 0;

  // ============================
  // RESULTADO FINAL
  // ============================

  return {
    level,            // Nivel actual
    xpTotal,          // XP total del usuario
    xpStart,          // XP mínima del nivel actual
    cost,             // XP necesaria para subir de nivel
    earnedInLevel,    // XP ganada dentro del nivel
    xpFaltante,       // XP faltante para subir
    progreso: Math.max(0, Math.min(100, progreso)), // % seguro
  };
};
