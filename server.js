import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Guardamos las cartas en memoria (solo mientras el servidor esté encendido)
const cartas = [];

// POST /api/send -> guarda una carta
app.post("/api/send", (req, res) => {
  const { texto } = req.body;
  if (!texto || texto.trim().length === 0) {
    return res.status(400).json({ error: "Carta vacía" });
  }
  cartas.push(texto.trim());
  res.json({ mensaje: "Carta guardada" });
});

// GET /api/random -> devuelve una carta aleatoria
app.get("/api/random", (req, res) => {
  if (cartas.length === 0) return res.json({ texto: null });
  const randomIndex = Math.floor(Math.random() * cartas.length);
  res.json({ texto: cartas[randomIndex] });
});

// Puerto que asigna Railway automáticamente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en marcha en puerto ${PORT}`));