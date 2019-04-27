const express = require('express');
const router = express.Router();
// const authController = require('../controllers/auth.controller');
const Player = require('../models/player.model');
const searchController = require('../controllers/search.controller')

router.get('/searchResults', searchController.list);
router.get('/search', searchController.search)


module.exports = router;