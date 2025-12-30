const pad2 = (n) => String(n).padStart(2, "0");

const formatMySQLDateTime = (d) => {
  // "YYYY-MM-DD HH:mm:ss"
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
};

export const getFechaFinPorFrecuencia = (frecuencia) => {
  const f = parseInt(frecuencia, 10);
  const d = new Date(); // ahora

  if (f === 1) d.setDate(d.getDate() + 1);      // +1 día
  else if (f === 2) d.setDate(d.getDate() + 7); // +1 semana (7 días)
  else if (f === 3) d.setMonth(d.getMonth() + 1); // +1 mes
  else return null;

  // Forzar 11:59 PM del día resultante
  d.setHours(23, 59, 0, 0);

  return formatMySQLDateTime(d);
};
