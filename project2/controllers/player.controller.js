const mongoose = require('mongoose');
const createError = require('http-errors');
const Player = require('../models/player.model');


module.exports.detail = (req, res, next) => {
    const criteria = req.params.id
    Player.findById(criteria)
      .then( player => {
        res.render('player/player', {player})
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

  module.exports.edit = (req, res, next) => {
    const id = req.params.id
    Player.findById(id)
      .then( player => {
        res.render('player/edit', {player})
      })
      .catch(error => next(error))
  }
  
  module.exports.doEdit = (req, res, next) => {
    //const id = req.params.id;
    const player = req.user;
    function renderWithErrors(errors) {
      res.render('player/account', {
        player,
        account: req.body,
        errors: errors
      })
    }

    Object.assign(player, req.body);
    player.save()
      .then(player => res.redirect('/player'))
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          renderWithErrors(error.errors);
        } else {
          next(error);
        }
      });
    
    
  }
    
    //  .then(player => res.redirect('/player'))
    //  .catch(error => {
    //    if(error instanceof mongoose.Error.ValidationError) {
    //      console.log('error')
    //      res.render('player/account', {
    //        player: req.body,
    //        errors: error.errors
    //      })
    //    } else {
    //      console.log('error')
    //      next(error);
    //      }
    //  })
  
  //const id = req.params.id;
  //const update = req.body;
  //  Player.findByIdAndUpdate(id, update)
  //    .then( () => {
  //      res.redirect('/player')
  //    })
  //    .catch(error => next(error))


  //const id = req.user._id;//profe: no es mejor pasar por post sin id¿?