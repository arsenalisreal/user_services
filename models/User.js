const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database (create if not exists)
const db = new sqlite3.Database('./data/users.db');

// Create users table if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Export database instance
module.exports = db;
