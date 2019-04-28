// aqui busqueda, resultados, perfil
const express = require('express');
const router = express.Router();
const Player = require('../models/player.model');
const playerController = require('../controllers/player.controller')
const secure = require('../middelwares/secure.mid');

router.get('/:id', playerController.detail)
router.get('/', secure.isAuthenticated, playerController.account);

router.get('/:id/edit', playerController.edit)
router.post('/:id', playerController.doEdit)

module.exports = router;
