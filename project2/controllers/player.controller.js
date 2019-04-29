const createError = require('http-errors')
const mongoose = require('mongoose')
const Player = require('../models/player.model');


module.exports.detail = (req, res, next) => {
    const criteria = req.params.id
    Player.findById(criteria)
      .then( player => {
        res.render('player/player.hbs', {player})
      })
      .catch(error => next(error))
  }

module.exports.account = (req, res, next) => {
  
    Player.findOne({email:req.user.email})
      .then(player => {
        res.render('player/account', { player })
      })
      .catch(error => next(error));
  }

  module.exports.edit = ((req, res, next) => {
    const id = req.params.id
    Player.findById(id)
      .then( player => {
        res.render('player/edit.hbs', {player})
      })
      .catch(error => next(error))
  })
  
  module.exports.doEdit = ((req, res, next) => {
    const id = req.params.id
    const update = req.body
    Player.findByIdAndUpdate(id, req.body)
      .then( () => {
        res.redirect('/player')
      })
      .catch(error => next(error))
  })
