const createError = require('http-errors')
const mongoose = require('mongoose')
const Player = require('../models/player.model');


module.exports.detail = ((req, res, next) => {
    const criteria = req.params.id
    Player.findById(criteria)
      .then( player => {
        res.render('player/player.hbs', {player})
      })
      .catch(error => next(error))
  })

module.exports.account = (req, res, next) => {
  
    Player.findOne({email:req.user.email})
      .then(player => {
        res.render('player/account', { player })
      })
      .catch(error => next(error));
  }