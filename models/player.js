// Player model
const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlayerSchema = new Schema ({
    name: { type: String },
    deck: []
});

const Player = mongoose.model('Player', PlayerSchema)
module.exports = {
    Player,
};
