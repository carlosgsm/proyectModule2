const createError = require('http-errors')
const mongoose = require('mongoose')
const Player = require('../models/player.model');

module.exports.list = ((req, res, next) => {
  Player.find({})
    .then( players => {
      res.render('search/searchResults', {players})
    })
    .catch(error => next(error))
})

// Aqui tiene que ir dinamicamente lo que se meta en el form de search


module.exports.search = ((req, res, next) => {
    Player.find({})
      .then( players => {
        res.render('search/search', {players})
      })
      .catch(error => next(error))
  })