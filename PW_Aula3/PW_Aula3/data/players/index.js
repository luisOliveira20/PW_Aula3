const Player = require('./player');
const PlayerController = require('./playerController');

const service = PlayerController(Player);

module.exports = service;