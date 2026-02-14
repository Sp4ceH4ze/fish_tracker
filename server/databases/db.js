const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');

const db = new sqlite3.Database('./database.db', err => {
  if (err) {
    console.error('Error connecting to database.', err.message);
  } else {
    console.log('Connected to SQLite database.');
    createTables();
  }
});

const run = promisify(db.run.bind(db));
const get = promisify(db.get.bind(db));
const all = promisify(db.all.bind(db));

async function createTables() {
  await run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`);

  console.log('users table created');

  await run(`
  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    location TEXT NOT NULL,
    NOTES TEXT
  )
`);

  console.log('sessions table created');

  await run(`
  CREATE TABLE IF NOT EXISTS catch (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL,
    species_id INTEGER NOT NULL,
    length_cm INTEGER,
    weight_kg INTEGER,
    bait_used TEXT,
    time_caught TEXT
  )
`);

  console.log('catch table created');

  await run(`
  CREATE TABLE IF NOT EXISTS species (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    is_active TEXT
  )
`);

  console.log('species table created');
}

module.exports = db;
