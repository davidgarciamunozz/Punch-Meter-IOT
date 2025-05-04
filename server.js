const express = require("express");
const cors = require("cors");
const path = require("path");
const { createServer } = require("http");

const authRouter = require("./server/routes/auth.router");
const usersRouter = require("./server/routes/users.router");

const PORT = process.env.PORT || 5001;

const app = express();
const httpServer = createServer(app);

// Configuración CORS detallada para permitir solicitudes desde el frontend
const corsOptions = {
  origin: 'http://localhost:3000', // Permitir solicitudes solo desde el frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

// For production, serve the Next.js app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, ".next")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, ".next", "index.html"));
  });
}

httpServer.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
); 