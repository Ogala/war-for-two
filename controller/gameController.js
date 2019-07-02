// Game logic
const { validationResult } = require('express-validator/check');
const logger  = require('../config/logger');
const { Player } = require('../models/player');
const { Game } = require('../models/game');
const {getDeck, shuffleDeck, dealCard } = require('./helperFunctions');
// const DECK = require('../utils/deck'); Use this if you wish to save trips to DB to create cards on initialization.

// Updates players' decks in the db
const updatePlayersDecks = async (p1Id, p2Id, p1Deck, p2Deck) => {
    if(typeof p1Id !== 'string' || typeof p2Id !== 'string'){
        throw Error('p1Id and p2Id  must be of type String');
    };
    if(!Array.isArray(p1Deck) || !Array.isArray(p1Deck)){
        throw Error('p1Deck and p2Deck must be of type Array');
    };
        const updatedP1 = await Player.findByIdAndUpdate({ _id: p1Id}, {deck: p1Deck}, {new: true});
        const updatedP2 = await Player.findByIdAndUpdate({ _id: p2Id}, {deck: p2Deck}, {new: true});
        return { updatedP1, updatedP2 };
}

// Build Result object
const buildResult = (winner, p1DeckSize, p2DeckSize, p1Cards, p2Cards) => {
    // Error checking
    if(typeof winner !== 'string'){
        throw Error('Winner argument must be a String');
    };
    if(typeof p1DeckSize !== 'number' || typeof p2DeckSize !== 'number'){
        throw Error('Deck sizes of P1 and P2 must be Numbers');
    };
    if(!Array.isArray(p1Cards) || !Array.isArray(p2Cards)){
        throw Error('p1Cards and p2Cards must be of type Array');
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
const checkWinner = async (card1, card2) => {
    // Error checking
    if(typeof card1 !== 'object' || typeof card2 !== 'object'){
        throw Error('Cards must be objects');
    }
    const card1Rank = card1.rank;
    const card2Rank = card2.rank;

    if(card1Rank > card2Rank){
        logger.info("player one won");
        return("PLAYER_ONE");
        
    } else if (card1Rank < card2Rank){
        logger.info("player one won");
        return('PLAYER_TWO');
    } else {
        logger.info("Tie");
        return 'tie'
    };
}

// Activate a war mode after a tie
const warMode = async (pot, p1Deck, p2Deck) => {
    logger.info('In War Mode');
    // Error checking
    if(!Array.isArray(pot)){
        throw Error('Pot must be an Array');
    };
    // check that both players have enough cards to finish the game
    const playerOneDeckSize = p1Deck.length;
    const playerTwoDeckSize = p2Deck.length;
    if(playerOneDeckSize < 4 ){
        const loot = [...p2Deck, ...p1Deck]
        p1Deck = [];
        const p1Cards = ["Insufficient P1 cards. Ending game."];
        const p2Cards = ["Insufficient P1 cards. Ending game."];
        console.log('P2 won in war');
        return { winner: "PLAYER_TWO", loot, p1Deck, p1Cards, p2Cards }
        }
    if(playerTwoDeckSize < 4 ){
        console.log('P1 won in war');
        const loot = [...p1Deck, ...p2Deck]
        p2Deck = [];
        const p1Cards = ["Insufficient P2 cards. Ending game."];
        const p2Cards = ["Insufficient P2 cards. Ending game."];
        return { winner: "PLAYER_ONE", loot, p2Deck, p1Cards, p2Cards }
        }
    const faceDownCard1 = p1Deck.shift();
    const faceDownCard2 = p2Deck.shift();
    const card1 = p1Deck.shift();
    const card2 = p2Deck.shift();
    const warPot = [faceDownCard1, faceDownCard2, ...pot];
    const pot2 = [card1, card2, ...warPot];
    const p1Cards = [faceDownCard1, card1]; // and cards passed from caller
    const p2Cards = [faceDownCard2, card2]; // and cards passed from caller
    const winner = await checkWinner(card1, card2);
    if(winner === "PLAYER_ONE"){
        const loot = [...p1Deck, ...pot2];
        return { winner: "PLAYER_ONE", loot, p2Deck, p1Cards, p2Cards }
    } else if (winner === "PLAYER_TWO"){
        const loot = [...p2Deck, ...pot2];
        return { winner: "PLAYER_TWO", loot, p1Deck, p1Cards, p2Cards }
    }
    // if another tie, call tie with pot two and the decks
    return warMode(pot2, p1Deck, p2Deck);
}

// Start an attack if both players have enough cards
const battle = async (game) => {
    const { playerOne, playerTwo } = game;
    const p1Id = playerOne.id;
    const p2Id = playerTwo.id;
    const PLAYER_ONE_DECK = [...playerOne.deck];
    const PLAYER_TWO_DECK = [...playerTwo.deck];
    const playerOneDeckSize = PLAYER_ONE_DECK.length;
    const playerTwoDeckSize = PLAYER_TWO_DECK.length;
    
    const GAME_OVER = playerOneDeckSize < 1 || playerTwoDeckSize < 1;
    if(!GAME_OVER){
        const card1 = PLAYER_ONE_DECK.shift();
        const card2 = PLAYER_TWO_DECK.shift();
        const pot = [card1, card2];
        const result = await checkWinner(card1, card2);
        // updated db based on winner
        if(result === 'PLAYER_ONE'){
            const loot = [...PLAYER_ONE_DECK, ...pot];
            const updatedPlayers = await updatePlayersDecks(p1Id, p2Id, loot, PLAYER_TWO_DECK);
            const {updatedP1, updatedP2 } = updatedPlayers;
            const p1DeckSize = updatedP1.deck.length;
            const p2DeckSize = updatedP2.deck.length;
            const roundResult = await buildResult('PLAYER_ONE', p1DeckSize, p2DeckSize, [card1], [card2]);
            return roundResult;

        } else if (result === 'PLAYER_TWO'){
            const loot = [...PLAYER_TWO_DECK, ...pot];
            const updatedPlayers = await updatePlayersDecks(p1Id, p2Id, PLAYER_ONE_DECK, loot);
            const {updatedP1, updatedP2 } = updatedPlayers;
            const p1DeckSize = updatedP1.deck.length;
            const p2DeckSize = updatedP2.deck.length;
            const roundResult = await buildResult('PLAYER_TWO', p1DeckSize, p2DeckSize, [card1], [card2]);
            return roundResult;
        }
        // tie
        const warModeResult = await warMode(pot, PLAYER_ONE_DECK, PLAYER_TWO_DECK);
        const { winner, loot, p1Cards, p2Cards } = warModeResult;
        if(winner === "PLAYER_ONE"){
            const { p2Deck } = warModeResult;
            const updatedPlayers = await updatePlayersDecks(p1Id, p2Id, loot, p2Deck);
            const {updatedP1, updatedP2 } = updatedPlayers;
            const p1DeckSize = updatedP1.deck.length;
            const p2DeckSize = updatedP2.deck.length;
            const warRoundResult = await buildResult('PLAYER_ONE', p1DeckSize, p2DeckSize, [...p1Cards], [...p2Cards]);
            return warRoundResult;
        } 

        // player two won
        const { p1Deck } = warModeResult;
        const updatedPlayers = await updatePlayersDecks(p1Id, p2Id, p1Deck, loot);
        const {updatedP1, updatedP2 } = updatedPlayers;
        const p1DeckSize = updatedP1.deck.length;
        const p2DeckSize = updatedP2.deck.length;
        const warRoundResult = await buildResult('PLAYER_ONE', p1DeckSize, p2DeckSize, [...p1Cards], [...p2Cards]);
        return warRoundResult;
    };

};

// Initializes a game
const initializeGame = async (req, res) => {
    const deck = await getDeck();
    console.log("deck length ", deck.length)
    const shuffledDeck = await shuffleDeck(deck);
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
    // res.json(deck);
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
        const newBattleCount = game.battleCount+1;
        // increament battlecount
        const updatedBattleCount = await Game.findByIdAndUpdate({_id: id}, {battleCount: newBattleCount}, {new: true});
        const battleCount = updatedBattleCount.battleCount;
        if(battleCount > 2999){
            return res.json(`STALEMATE. Unable to decide winner after ${battleCount} battles`);
        };
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