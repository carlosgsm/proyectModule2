// aqui busqueda, resultados, perfil
const express = require('express');
const router = express.Router();
// const authController = require('../controllers/auth.controller');
const Player = require('../models/player.model');
const playerController = require('../controllers/player.controller')

router.get('/:id', playerController.detail)


module.exports = router;
