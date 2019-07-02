const express = require('express');
const { param } = require('express-validator/check');
const { sanitizeParam } = require('express-validator/filter');

const router = express.Router();

const gameController = require('../controller/gameController')

router.get('/game', gameController.initializeGame);

// Starts a new game of war and returns the game's id.
router.put('/game', gameController.initializeGame);

/*
 Gets the status of the identified game, returning the number of cards each
 player has in their deck.
*/
router.get(
  '/game/:id', 
  [
    param('id')
      .isMongoId()
      .not().isEmpty(),
    sanitizeParam('notifyOnReply').toBoolean(),
  ],
  gameController.getGameStatus
  );

/*
  Runs one battle, including resolving any ties. The response should identify
  the winner, and show the cards each player played as well as their new deck
  sizes.
*/
router.post(
  '/game/:id/play', 
  [
    param('id')
      .isMongoId()
      .not().isEmpty(),
    sanitizeParam('notifyOnReply').toBoolean(),
  ],
  gameController.playGame
  );

module.exports = router;
