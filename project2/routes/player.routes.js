// aqui busqueda, resultados, perfil
const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player.controller')
const secure = require('../middelwares/secure.mid');

router.get('/:id', playerController.detail)
router.get('/', secure.isAuthenticated, playerController.account);


module.exports = router;
