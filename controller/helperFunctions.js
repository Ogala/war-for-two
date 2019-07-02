// Helper functions
const { Card } = require('../models/card');
const logger  = require('../config/logger');

const STRING = 'string'
const SUITS = ['HEARTS', 'SPADES', 'CCLUBS', 'DIAMONDS']
const CARD_TYPES = ['A', 'K', 'Q', 'J', 'T','9', '8', '7', '6', '5', '4', '3', '2'];

// Check that an Array contains only one type - string
const confirmTypeString = (arr) => {
    return arr.every(i => typeof i === STRING)
};

// create Deck
const createDeck =  () => {
    let deck = [];
    let retryCount = 0;
    SUITS.forEach(suit => {
        CARD_TYPES.forEach((name, index) => {
            const rank = 13 - index;
            const identifier = `${suit}${name}`;
            const card = new Card({name, rank, suit, identifier})
            deck.push(card);
            card.save((err, card1) => {
                if(err){
                    logger.error(`${err}`);
                    // Try again, 10 times
                    while(retryCount < 10){
                        createDeck();
                    }
                };
                logger.info(card1.identifier);
            })
        });
    });
    return deck;
};
// Create the Deck of 52 Cards and save to DB
const getDeck = async () => {
    // Error checking
    if(SUITS.length !== 4){
        throw Error('Suit must be an Array of length 4');
    }
    if(CARD_TYPES.length !== 13){
        throw Error('Card types must be an Array of length 13');
    }
    if(!confirmTypeString(SUITS)){
        throw Error('Suits must be an Array of strings');
    }
    if(!confirmTypeString(CARD_TYPES)){
        throw Error('Card Types must be an Array of strings');
    }
  // Only create deck if it doesn't already exist
  const existingDeck = await Card.find();
  if(existingDeck.length === 52){
      return existingDeck;
  }
  const deck = await createDeck();
  return deck
}

// Shuffles a deck based on Fisher-Yetes algorithm
const shuffleDeck = (deck) => {
    // Error checking
    if(!Array.isArray(deck)){
        throw Error('Deck must be an Array');
    };
    if(deck.length !== 52){
        throw Error('Deck must contain only 52 cards');
    }
   
   let currentIndex = deck.length;
   let temporaryValue;
   let randomIndex;

   // While there remain elements to shuffle...
   while (currentIndex !== 0) {
 
     // Pick a remaining element...
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;
 
     // And swap it with the current element.
     temporaryValue = deck[currentIndex];
     deck[currentIndex] = deck[randomIndex];
     deck[randomIndex] = temporaryValue;
   }
    return deck;
}

// Deal cards to both players
const dealCard = (deck) => {
    // Error checking
    if(!Array.isArray(deck)){
        throw Error('Deck must be an Array');
    };
    if(deck.length !== 52){
        throw Error('Deck must contain only 52 cards');
    }
    // create two arrays
    const playerOneDeck = deck.filter((card, index) => index % 2 !== 0 );
    const playerTwoDeck = deck.filter((card, index) => index % 2 === 0 );
    return [playerOneDeck, playerTwoDeck]
}

module.exports = {
    confirmTypeString,
    getDeck,
    shuffleDeck,
    dealCard,
}