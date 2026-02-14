const express = require('express');
const db = require('./databases/db');
const initializeDatabase = require('./databases/init_database');

const app = express();
const PORT = 3000;

// FUNCTIONS

function shutdown() {
  console.log('Closing database connection...');
  db.close(err => {
    if (err) {
      console.error('Error closing database:', err.message);
    }
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// EVENT LOOP

(async () => {
  await initializeDatabase();
  console.log('Database ready.');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
})();
