// Game logic
const { validationResult } = require('express-validator/check');
const logger  = require('../config/logger');
const { Player } = require('../models/player');
const { Game } = require('../models/game');
const { shuffleDeck, dealCard } = require('./helperFunctions');
const DECK = require('../utils/deck');

// Updates players' decks in the db
const updatePlayersDecks = async (p1Id, p2Id, p1Deck, p2Deck) => {
        const updatedP1 = await Player.findByIdAndUpdate({ _id: p1Id}, {deck: p1Deck}, {new: true});
        const updatedP2 = await Player.findByIdAndUpdate({ _id: p2Id}, {deck: p2Deck}, {new: true});
}

// Build Result object
const buildResult = async (winner, p1DeckSize, p2DeckSize, p1Cards, p2Cards) => {
    // Error checking
    if(typeof winner !== 'string'){
        throw Error('Winner argument must be a String');
    };
    const result = {
        winner: winner,
        playerOne: { deck: p1DeckSize, cards: p1Cards },
        playerTwo: { deck: p2DeckSize, cards: p2Cards }
    }
    return result;
}
// Takes two cards, compares their ranks and calls a winner or war if tie
// Add losser's card to winners gameDeck
// remove card from losser's gameDeck
// Return winner
const checkWinner = async (card1, card2, pot, playerOne, playerTwo) => {
    // Error checking
    if(!Array.isArray(pot)){
        throw Error('Pot must be an Array');
    };
    if(typeof card1 !== 'object' || typeof card2 !== 'object'){
        throw Error('Cards must be objects');
    }
    const PLAYER_ONE_DECK = [...playerOne.deck];
    const PLAYER_TWO_DECK = [...playerTwo.deck];
    const PLAYER_ONE_ID = playerOne.id;
    const PLAYER_TWO_ID = playerTwo.id;
    const card1Rank = card1.rank;
    const card2Rank = card2.rank;
    const p1Cards = [card1];
    const p2Cards = [card2];
    if(card1Rank > card2Rank){
        logger.info("player one won");
        const newP1Deck = [...PLAYER_ONE_DECK, ...pot];
        await Player.findByIdAndUpdate({ _id: PLAYER_ONE_ID}, {deck: newP1Deck});
        await Player.findByIdAndUpdate({ _id: PLAYER_TWO_ID}, {deck: PLAYER_TWO_DECK});
        const p1DeckSize = newP1Deck.length;
        const p2DeckSize = PLAYER_TWO_DECK.length;
        const result = await buildResult('playerOne', p1DeckSize, p2DeckSize, p1Cards, p2Cards);
        return result;
    } else if (card1Rank < card2Rank){
        logger.info("player two won");
        const newP2Deck = [...PLAYER_TWO_DECK, ...pot];
        await Player.findByIdAndUpdate({ _id: PLAYER_TWO_ID}, {deck: PLAYER_TWO_DECK});
        await Player.findByIdAndUpdate({ _id: PLAYER_ONE_ID}, {deck: newP2Deck});
        const p1DeckSize = PLAYER_ONE_DECK.length;
        const p2DeckSize = newP2Deck.length;
        const result = await buildResult('playerOne', p1DeckSize, p2DeckSize, p1Cards, p2Cards);
        return result;
    } else {
        // check if both players have enough cards to complete a war
        const playerOneDeckSize = PLAYER_ONE_DECK.length;
        const playerTwoDeckSize = PLAYER_TWO_DECK.length;
        if(playerOneDeckSize < 4 ){
            GAME_OVER = true;
            logger.info('player two won in tie');
            PLAYER_TWO_DECK = [...PLAYER_TWO_DECK, ...PLAYER_ONE_DECK, ...pot];
            await Player.findByIdAndUpdate({ _id: PLAYER_TWO_ID}, {deck: PLAYER_TWO_DECK});
            await Player.findByIdAndUpdate({ _id: PLAYER_ONE_ID}, {deck: []});
            return buildResult('playerTwo')
        }
        if(playerTwoDeckSize < 4 ){
            GAME_OVER = true;
            logger.info('player one won in tie');
            PLAYER_ONE_DECK = [...PLAYER_ONE_DECK, ...PLAYER_TWO_DECK, ...pot];
            await Player.findByIdAndUpdate({ _id: PLAYER_ONE_ID}, {deck: PLAYER_ONE_DECK});
            await Player.findByIdAndUpdate({ _id: PLAYER_TWO_ID}, {deck: []});
            return buildResult('playerOne')
        }
        // activate war mode
        return warMode(pot, PLAYER_ONE_DECK, PLAYER_TWO_DECK);
    };
    
}

// Activate a war mode after a tie
const warMode = (pot, p1Deck, p2Deck) => {
    // Error checking
    if(!Array.isArray(pot)){
        throw Error('Pot must be an Array');
    };
    console.log("tie")
    const faceDownCard1 = p1Deck.shift();
    const faceDownCard2 = p2Deck.shift();
    const card1 = p1Deck.shift();
    const card2 = p2Deck.shift();
    const warPot = [faceDownCard1, faceDownCard2, ...pot];
    const pot2 = [card1, card2, ...warPot];
    return checkWinner(card1, card2, pot2);
}

// Start an attack if both players have enough cards
const battle = async (game) => {
    const { playerOne, playerTwo } = game;
    const PLAYER_ONE_DECK = [...playerOne.deck];
    const PLAYER_TWO_DECK = [...playerTwo.deck];
    const playerOneDeckSize = PLAYER_ONE_DECK.length;
    const playerTwoDeckSize = PLAYER_TWO_DECK.length;
    const GAME_OVER = playerOneDeckSize < 1 || playerTwoDeckSize < 1;
    if(!GAME_OVER){
        const card1 = PLAYER_ONE_DECK.shift();
        const card2 = PLAYER_TWO_DECK.shift();
        const pot = [card1, card2];
        const result = await checkWinner(card1, card2, pot, playerOne, playerTwo);
        return result;
    };
    logger.info('Game over', GAME_OVER)
    return playerOneDeckSize > 0 ? buildResult('playerOne') : buildResult('playerTwo');

}

// Initializes a game
const initializeGame = async (req, res) => {
    const shuffledDeck = await shuffleDeck(DECK);
    const playerDecks = await dealCard(shuffledDeck)
    const [playerOneDeck, playerTwoDeck] = playerDecks;
    const PLAYER_ONE = new Player({ name: 'playerOne', deck: playerOneDeck } );
    const PLAYER_TWO = new Player({ name: 'playerTwo', deck: playerTwoDeck } );
    const playerOne = await PLAYER_ONE.save();
    const playerTwo = await PLAYER_TWO.save();
    const currentGame = new Game({
        playerOne,
        playerTwo,
        playerOneStartDeck: playerOneDeck,
        playerTwoStartDeck: playerOneDeck
    });
    const game = await currentGame.save();
    return res.json({id: game.id.toString()});
};

// Get Status of an Identified game
const getGameStatus = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }
    try {
        const { id } = req.params;
        const targetGame = await Game.findById({_id: id}).populate('playerOne').populate('playerTwo');
        if(targetGame){
            const { playerOne, playerTwo } = targetGame;
            const playerOneDeckCount = playerOne.deck.length;
            const playerTwoDeckCount = playerTwo.deck.length;
            return res.json({ playerOne: playerOneDeckCount, playerTwo: playerTwoDeckCount})
        }
        return res.status(400).json('Game not found');
    } catch (err) {
        logger.error(`${err}`);
        return res.status(400).json(`${err}`);
    }
};

// Play a game and return Winner
const playGame = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }
    try {
        const { id } = req.params;
        // Extract player deck from Game
        const game = await Game.findById({_id: id})
            .populate({ path: 'playerOne' })
            .populate({ path: 'playerTwo' });
        if(!game){
            return res.status(400).json('Game not found')
        }
        const result = await battle(game);
        return res.json(result);
    } catch (err) {
        logger.error(`${err}`);
        return res.status(400).json(`${err}`);
    }
    
};

module.exports = {
    initializeGame,
    getGameStatus,
    playGame,
    battle,
    buildResult,
    checkWinner
}