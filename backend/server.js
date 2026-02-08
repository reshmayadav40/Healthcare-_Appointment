const path = require("path");
const fs = require("fs");
const jsonServer = require("json-server");
const cors = require("cors");
const express = require("express");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Resolve DB path to avoid cwd issues
const dbPath = path.join(__dirname, "db.json");
if (!fs.existsSync(dbPath)) {
  console.error("Fatal: db.json not found at", dbPath);
  process.exit(1);
}

const router = jsonServer.router(dbPath);

let routes = {};
try {
  routes = require(path.join(__dirname, "routes.json"));
} catch (err) {
  console.warn("Warning: routes.json not found or invalid - continuing without custom rewrites.", err?.message || err);
}

// enable CORS for all origins (frontend will be hosted separately on Render)
server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Apply custom routes only if provided
if (routes && Object.keys(routes).length) {
  server.use(jsonServer.rewriter(routes));
}

// Simple request logger for debugging
server.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

server.use(router);

// If a built frontend exists (../healthCare/dist), serve it from the backend
const clientDist = path.join(__dirname, "..", "healthCare", "dist");
if (fs.existsSync(clientDist)) {
  console.log("Serving frontend from:", clientDist);
  // Use express static to serve the built SPA
  server.use(express.static(clientDist));
  server.get("/*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err && err.stack ? err.stack : err);
  // optionally exit or keep running depending on needs
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
