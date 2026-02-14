const initializeDatabase = require('./databases/init_database');

(async () => {
  await initializeDatabase();
  console.log('Database ready.');
})();
