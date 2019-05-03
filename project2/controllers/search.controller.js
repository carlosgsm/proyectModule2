const createError = require('http-errors')
const mongoose = require('mongoose')
const Player = require('../models/player.model');

module.exports.list = ((req, res, next) => {
//   const search = req.query;
//   Player.find({$or:[{nick:search.nick}, {nickInGame: search.nickInGame},
//   {country:search.country},{game:search.game}]})

//     .then( players => {
//       res.render('search/searchResults', {players})
//     })
//     .catch(error => next(error))
// }
Player.find({})
.then( players => {
  res.render('search/searchResults', {players})
})
.catch(error => next(error))
})

module.exports.searchForm = (req, res, next) => {
    
    const search = req.query;

    if(search.nick || search.nickInGame || search.country || search.game) {
    Player.find({$or:[{nick:search.nick}, {nickInGame: search.nickInGame},
    {country:search.country},{game:search.game}]})
  
      .then( players => {
        res.render('search/search', {players})
      })
      .catch(error => next(error)) 
     } else {
    Player.find({})
      .then( players => {
        res.render('search/search', {players})
      })
      .catch(error => next(error))
  }
}
