const Player = require('../models/player.model');
// const Celebrities = require('../data/celebrities.json');
const mongoose = require('mongoose');
require('../config/db.config');

const Players =
[

  {
    "email": "213@hotmail.com",
    "password": "213123",
    "nick": "julio iglesias",
    "nickInGame": "vividor",
    "country": "Spain",
    "game": "CSGO",
    "levelInGame": "213123",
    "goal": "Hardcore",
    "language": "ES",
    "schedule": "Morning",
  },
  
  {
    "email": "2123@hotmail.com",
    "password": "2131231",
    "nick": "fary",
    "nickInGame": "frania",
    "country": "Germany",
    "game": "Fortnite",
    "levelInGame": "213123",
    "goal": "Hardcore",
    "language": "ES",
    "schedule": "Morning",
  },

  {
    "email": "21223@hotmail.com",
    "password": "21313231",
    "nick": "reshulon",
    "nickInGame": "reshulon69",
    "country": "Germany",
    "game": "Fortnite",
    "levelInGame": "213123",
    "goal": "Casual",
    "language": "ENG",
    "schedule": "Morning",
  },
  
  ]

Player.create(Players)
  .then((Players) => console.info(`${Players.length} new PLAYER added to the database`))
  .catch(error => console.error(error))
  .then(() => mongoose.connection.close());