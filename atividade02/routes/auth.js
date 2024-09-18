const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
const { username, password } = req.body;
const hashedPassword = await bcrypt.hash(password, 10);
try {
const user = await User.create({ username, password: hashedPassword });
res.status(201).json({ id: user.id, username: user.username });
} catch (error) {
res.status(500).json({ error: 'Usuário já existe ou erro ao registrar' });
}
});

// Login
router.post('/login', async (req, res) => {
const { username, password } = req.body;
const user = await User.findOne({ where: { username } });
if (user && await bcrypt.compare(password, user.password)) {
res.status(200).json({ message: 'Login bem-sucedido' });
} else {
res.status(401).json({ error: 'Credenciais inválidas' });
}
});

// Listar usuários
router.get('/list', async (req, res) => {
const users = await User.findAll({ attributes: ['id', 'username'] });
res.status(200).json(users);
});

module.exports = router;
