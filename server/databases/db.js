const sqlite3 = require('sqlite3').verbose();
const path = require('path');
// const { promisify } = require('util');

const database_path = path.join(__dirname, 'database.db');

const db = new sqlite3.Database(database_path, err => {
  if (err) {
    console.error('Error connecting to database.', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

db.run('PRAGMA foreign_keys = ON');

// const run = promisify(db.run.bind(db));
// const get = promisify(db.get.bind(db));
// const all = promisify(db.all.bind(db));

module.exports = db;
