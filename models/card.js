// model for a Card
const mongoose = require('mongoose');

const { Schema } = mongoose;

const CardSchema = new Schema({
    name: { type: String },
    rank: { type: Number },
    suit: { type: String },
    identifier: { type: String, unique: true }
});

const DeckSchema = new Schema({
    deck: [ CardSchema ]
})
const Card = mongoose.model('Card', CardSchema);
const Deck = mongoose.model('Deck', DeckSchema);

module.exports = {
    Card,
    Deck
};