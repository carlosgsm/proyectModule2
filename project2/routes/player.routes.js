
const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player.controller')
const secure = require('../middelwares/secure.mid');

router.get('/:id', secure.isAuthenticated, playerController.detail)

router.get('/', secure.isAuthenticated, playerController.account);
router.post('/', secure.isAuthenticated, playerController.doEdit)

router.get('/:id/edit', secure.isAuthenticated, playerController.edit)

module.exports = router;


//profes: router.post('/',secure.isAuthenticated, playerController.doEdit)
