// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Registrar usuario
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login de usuario (simple, sin cifrado)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

module.exports = router;
