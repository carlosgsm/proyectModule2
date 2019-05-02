const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
//const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const constants = require('../constants-players')//para traerse campos cerrados
const GOAL_TYPES = constants.GOAL_TYPES
const LANGUAGES_LIST = constants.LANGUAGES_LIST
const SCHEDULES_LIST = constants.SCHEDULES_LIST
const COUNTRIES_LIST = constants.COUNTRIES_LIST
const GAME_LIST = constants.GAME_LIST;

const playerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  nick: {
    type: String,
    unique: true,
    trim: true,
    validate: [/\S+/, 'Field can\'t be empty']
  },
  nickInGame: {
    type: String,
    unique: true,
    trim: true,
    validate: [/\S+/, 'Field can\'t be empty']
  },
  country: {
    type: String,
    enum: {
      values: COUNTRIES_LIST,
      message: 'Choose your {PATH}'
    }
  },
  game: {
    type: String,
    enum: {
      values: GAME_LIST,
      message: 'Choose a {PATH}'
    }
  },
  levelInGame: {
    type: String,
  },
  goal: {
    type: String,
    enum: GOAL_TYPES
  },
  language: {
    type: String,
    enum: LANGUAGES_LIST
  },
  schedule: {
    type: String,
    enum: SCHEDULES_LIST
  },
  //incluyo valores de google API
  name: String,
  avatarURL: String,
  googleID: String
},{ timestamps: true })

playerSchema.pre('save', function(next) {
  const player = this;
  bcrypt.genSalt(SALT_WORK_FACTOR)
    .then(salt => {
      return bcrypt.hash(player.password, salt)
        .then(hash => {
          player.password = hash;
          next();
        });
    })
    .catch(error => next(error));
});

playerSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
}

playerSchema.plugin(uniqueValidator, { message: '{PATH} already exists!' });

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;