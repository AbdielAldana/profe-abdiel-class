// ReactJS
import React from "react";

// Material UI
import { Grid, Typography, Divider, Chip } from "@mui/material";

// Context
import { useTablon } from "../../components/Tablon/TablonContext";
import { useCookies } from "react-cookie";

// Componentes
import Mision from "../../components/Tablon/Misiones/Mision";

function Misiones() {
  const { misiones, usuarios, tipo_entrega } = useTablon();
  const [cookies] = useCookies(["matricula_actual"]);

  const matricula = cookies.matricula_actual;

  const isVencida = (fechaFinGlobal) => {
    const fin = new Date(fechaFinGlobal.replace(" ", "T")).getTime();
    return fin - Date.now() <= 0;
  };

  const frecuenciaLabel = (f) => {
    switch (Number(f)) {
      case 1: return "Diaria";
      case 2: return "Semanal";
      case 3: return "Mensual";
      default: return "No Periódica";
    }
  };

  if (!misiones || !usuarios) return null;

  // Usuario (si existe cookie)
  const user = matricula ? usuarios.find((u) => u.matricula === matricula) : null;
  const completadasSet = user ? new Set(user.misionesCompletadas) : new Set();

  // Clasificación
  const periodicas = [];
  const disponibles = [];
  const completadas = [];
  const vencidas = [];

  for (const m of misiones) {
    const completada = completadasSet.has(m.id_mision);
    const vencida = isVencida(m.fechaFinGlobal);
    const esPeriodica = Number(m.frecuencia) > 0;

    if (completada) {
      completadas.push(m);
      continue;
    }

    if (vencida) {
      vencidas.push(m);
      continue;
    }

    if (esPeriodica) {
      periodicas.push(m);
    } else {
      disponibles.push(m);
    }
  }

  const renderMision = (m, completada) => (
    <Mision
      key={m.id_mision}
      mision={m}      
      tipo_entrega={tipo_entrega}
      completada={completada}
    />
  );

  return (
    <Grid container spacing={3}>
      {/* PERIÓDICAS (ARRIBA) */}
      <Grid size={{ xs: 12 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Misiones Periódicas
        </Typography>
      </Grid>

      {periodicas.length === 0 ? (
        <Grid size={{ xs: 12 }}>
          <Typography variant="body2" color="text.secondary">
            No hay misiones periódicas disponibles por ahora.
          </Typography>
        </Grid>
      ) : (
        periodicas.map((m) => renderMision(m, false))
      )}

      {/* DISPONIBLES */}
      <Grid size={{ xs: 12 }}>
        <Divider sx={{ my: 1 }} />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Misiones Unicas
        </Typography>
      </Grid>

      {disponibles.length === 0 ? (
        <Grid size={{ xs: 12 }}>
          <Typography variant="body2" color="text.secondary">
            No hay misiones disponibles por ahora.
          </Typography>
        </Grid>
      ) : (
        disponibles.map((m) => renderMision(m, false))
      )}

      {/* COMPLETADAS (solo si hay usuario real) */}
      {user && (
        <>
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Misiones Completadas
            </Typography>
          </Grid>

          {completadas.length === 0 ? (
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" color="text.secondary">
                Aún no completas misiones.
              </Typography>
            </Grid>
          ) : (
            completadas.map((m) => renderMision(m, true))
          )}
        </>
      )}

      {/* VENCIDAS (SIEMPRE AL FINAL) */}
      {vencidas.length > 0 && (
        <>
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Misiones Vencidas
            </Typography>
          </Grid>

          {vencidas.map((m) => renderMision(m, false))}
        </>
      )}

      {/* Mensaje registro */}
      {!matricula && (
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom textAlign="center">
            Registrate para participar.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default Misiones;
