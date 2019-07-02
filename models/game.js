// Model for a Game
const mongoose = require('mongoose');

const { Schema } = mongoose;

const GameSchema = new Schema ({
    battleCount: { type: Number, default: 0 },
    playerOne: {type: Schema.Types.ObjectId, ref: 'Player'},
    playerTwo: {type: Schema.Types.ObjectId, ref: 'Player'},
    playerOneStartDeck: [],
    playerTwoStartDeck: []
});

const Game = mongoose.model('Game', GameSchema)
module.exports = {
    Game
};