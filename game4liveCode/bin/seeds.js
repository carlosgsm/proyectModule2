const Player = require('../models/player.model');
// const Celebrities = require('../data/celebrities.json');
const mongoose = require('mongoose');
require('../config/db.config');

const Players =
[

  {
      "name": "julio iglesias",
      "nickInGame": "vividor",
      "password": "213123",
      "email": "213@hotmail.com",
  },
  
  {
    "name": "fary",
    "nickInGame": "que risas",
    "password": "213321123",
    "email": "213213@hotmail.com",
  },
  ]

Player.create(Players)
  .then((Players) => console.info(`${Players.length} new PLAYER added to the database`))
  .catch(error => console.error(error))
  .then(() => mongoose.connection.close());