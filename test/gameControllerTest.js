const { assert, expect } = require('chai');
const { 
    buildResult, 
 } = require('../controller/gameController');

 const { dealCard, shuffleDeck} = require('../controller/helperFunctions')

 // Stubs
const testDeck = [
    '1', '2', '3', '4','5','6','7','8','9','10','11','12','13',
    '1', '2', '3', '4','5','6','7','8','9','10','11','12','13',
    '1', '2', '3', '4','5','6','7','8','9','10','11','12','13',
    '1', '2', '3', '4','5','6','7','8','9','10','11','12','13'];
const testCard1 = {
    "_id" :"5d038da49ec40621e3cc69b7",
    "name" : "8",
    "rank" : 7,
    "suit" : "HEARTS",
    "__v" : 0
};
const testCard2 = {
    "_id" :"5d038da49ec40621e3cc69b9",
    "name" : "6",
    "rank" : 5,
    "suit" : "HEARTS",
    "__v" : 0
};
const testPot = [
    {
	"_id" :"5d038da49ec40621e3cc69b7",
	"name" : "8",
	"rank" : 7,
	"suit" : "HEARTS",
	"__v" : 0
},
{
	"_id" : "5d038da49ec40621e3cc69b9",
	"name" : "6",
	"rank" : 5,
	"suit" : "HEARTS",
	"__v" : 0
}]


dealCardResult = dealCard(testDeck);
buildResultResult = buildResult('playerX');
shuffleDeckResult = shuffleDeck(testDeck);

describe('DealCard', function(){
    it('Should return array of length 2', function(){
        assert.lengthOf(dealCardResult, 2);
    });

    it('Should return type of Array', function(){
        assert.typeOf(dealCardResult, 'Array');
    })
});

describe('BuildResult', function(){
    it('Should return an object', function(){
        assert.isObject(buildResultResult);
    });
    it('Value of winner should be string', function(){
        assert.include(buildResultResult, { winner: 'playerX'});
    });
    it('Has complete keys', function(){
        assert.hasAllKeys(buildResultResult, ['winner', 'playerOne', 'playerTwo']);
    });
});

describe('ShufflDeck', function(){
    it('Should return equal amount of cards in the Deck', function(){
        expect(shuffleDeckResult.length).to.be.equal(testDeck.length);
    });
    it('Should shuffle the Deck', function(){
        expect(shuffleDeckResult).to.be.not.equal(['1', '2', '3', '4']);
    });
    it('Should return an Array', function(){
        assert.isArray(shuffleDeckResult);
    });
});