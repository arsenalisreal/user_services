const express = require('express');
const router = express.Router();
const db = require('../models/User');

// Create a new user
router.post('/createUser', (req, res) => {
  const { username, email, password } = req.body;
  db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, password],
    function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      res.status(201).json({ message: 'User created successfully' });
    });
});

// Get user by ID
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  db.get(`SELECT * FROM users WHERE id = ?`, [userId], (err, row) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(row);
  });
});

// Update user by ID
router.put('/:userId', (req, res) => {
  const userId = req.params.userId;
  const { username, email, password } = req.body;
  db.run(`UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`,
    [username, email, password, userId],
    function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      res.json({ message: 'User updated successfully' });
    });
});

// Delete user by ID
router.delete('/:userId', (req, res) => {
  const userId = req.params.userId;
  db.run(`DELETE FROM users WHERE id = ?`, [userId], function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.json({ message: 'User deleted successfully' });
  });
});

module.exports = router;
