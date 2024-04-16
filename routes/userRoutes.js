const express = require('express');
const router = express.Router();
const db = require('../models/User');

// GET all users
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(rows);
  });
});

// POST create a new user
router.post('/', (req, res) => {
  const { username, email, password} = req.body;
  db.run('INSERT INTO users (username, email,password) VALUES (?, ?, ?)', [username, email, password], function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.status(201).json({ message: 'User created successfully' });
  });
});

// PUT update user by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  db.run('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, id], function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.json({ message: 'User updated successfully' });
  });
});

// DELETE delete user by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.json({ message: 'User deleted successfully' });
  });
});

module.exports = router;
