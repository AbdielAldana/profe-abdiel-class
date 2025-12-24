import { Paper, Typography } from "@mui/material";

export default function MateriaInfo({ objetivo, proposito, temas, software, proyecto }) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Información de la Materia
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Objetivo
      </Typography>
      <Typography paragraph>{objetivo}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Propósito
      </Typography>
      <Typography paragraph>{proposito}</Typography>


      <Typography variant="h6" sx={{ mt: 2 }}>
        Proyecto
      </Typography>
      <Typography paragraph>{proyecto}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        ¿Qué se espera ver en la materia?
      </Typography>
      <ul>
        {temas.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Software a utilizar
      </Typography>
      <ul>
        {software.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </Paper>
  );
}
