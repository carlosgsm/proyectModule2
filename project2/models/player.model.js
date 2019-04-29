const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const constants = require('../constants-players')//para traerse campos cerrados
const GOAL_TYPES = constants.GOAL_TYPES
const LANGUAGES_LIST = constants.LANGUAGES_LIST
const SCHEDULES_LIST = constants.SCHEDULES_LIST
const COUNTRIES_LIST = constants.COUNTRIES_LIST

const playerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [EMAIL_PATTERN, 'Invalid email pattern']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  nick: {
    type: String,
    required: [true, 'nick is required'],
    unique: true
  },
  nickInGame: {
    type: String,
    required: [true, 'nick in game is required'],
    unique: true
  },
  country: {
    type: String,
    required: [true, 'country is required'],
    enum: COUNTRIES_LIST

  },
  game: {
    type: String,
    required: [true, 'Game is required'],
  },
  levelInGame: {
    type: String,
    required: [true, 'level is required'],
  },
  goal: {
    type: String,
    required: [true, 'kind of player is required'],
    enum: GOAL_TYPES
  },
  language: {
    type: String,
    required: [true, 'language is required'],
    enum: LANGUAGES_LIST
  },
  schedule: {
    type: String,
    required: [true, 'schedule is required'],
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

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;