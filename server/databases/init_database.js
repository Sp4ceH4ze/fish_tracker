const db = require('./db');
const { promisify } = require('util');

const run = promisify(db.run.bind(db));

/* =========================
   TABLE DEFINITIONS
========================= */

const CREATE_USERS_TABLE = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`;

const CREATE_SESSIONS_TABLE = `
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`;

const CREATE_SPECIES_TABLE = `
CREATE TABLE IF NOT EXISTS species (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  is_active INTEGER DEFAULT 1
);
`;

const CREATE_CATCHES_TABLE = `
CREATE TABLE IF NOT EXISTS catches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL,
  species_id INTEGER NOT NULL,
  length_cm INTEGER,
  weight_kg REAL,
  bait_used TEXT,
  time_caught TEXT,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (species_id) REFERENCES species(id) ON DELETE CASCADE
);
`;

/* =========================
   INDEX DEFINITIONS
========================= */

const CREATE_IDX_CATCHES_SESSION = `
CREATE INDEX IF NOT EXISTS idx_catches_session
ON catches(session_id);
`;

const CREATE_IDX_CATCHES_SPECIES = `
CREATE INDEX IF NOT EXISTS idx_catches_species
ON catches(species_id);
`;

const CREATE_IDX_SESSIONS_DATE = `
CREATE INDEX IF NOT EXISTS idx_sessions_date
ON sessions(date);
`;

/* =========================
   INITIALIZATION
========================= */

async function initializeDatabase() {
  try {
    await run(CREATE_USERS_TABLE);
    await run(CREATE_SESSIONS_TABLE);
    await run(CREATE_SPECIES_TABLE);
    await run(CREATE_CATCHES_TABLE);

    await run(CREATE_IDX_CATCHES_SESSION);
    await run(CREATE_IDX_CATCHES_SPECIES);
    await run(CREATE_IDX_SESSIONS_DATE);

    console.log('Database initialized.');
  } catch (err) {
    console.error('Database initialization failed:', err.message);
    process.exit(1);
  }
}

module.exports = initializeDatabase;
