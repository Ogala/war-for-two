// Deck of cards 

const DECK = [
    {
        "_id" : "5d038da49ec40621e3cc69b1",
        "name" : "A",
        "rank" : 13,
        "suit" : "HEARTS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69b2",
        "name" : "K",
        "rank" : 12,
        "suit" : "HEARTS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69b3",
        "name" : "Q",
        "rank" : 11,
        "suit" : "HEARTS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69b4",
        "name" : "J",
        "rank" : 10,
        "suit" : "HEARTS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69b5",
        "name" : "T",
        "rank" : 9,
        "suit" : "HEARTS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69b7",
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
    },
    {
        "_id" : "5d038da49ec40621e3cc69b8",
        "name" : "7",
        "rank" : 6,
        "suit" : "HEARTS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69b6",
        "name" : "9",
        "rank" : 8,
        "suit" : "HEARTS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69ba",
        "name" : "5",
        "rank" : 4,
        "suit" : "HEARTS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69bc",
        "name" : "3",
        "rank" : 2,
        "suit" : "HEARTS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69be",
        "name" : "A",
        "rank" : 13,
        "suit" : "SPADES",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69bd",
        "name" : "2",
        "rank" : 1,
        "suit" : "HEARTS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69bb",
        "name" : "4",
        "rank" : 3,
        "suit" : "HEARTS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69bf",
        "name" : "K",
        "rank" : 12,
        "suit" : "SPADES",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69c0",
        "name" : "Q",
        "rank" : 11,
        "suit" : "SPADES",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69c1",
        "name" : "J",
        "rank" : 10,
        "suit" : "SPADES",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69c4",
        "name" : "8",
        "rank" : 7,
        "suit" : "SPADES",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69c5",
        "name" : "7",
        "rank" : 6,
        "suit" : "SPADES",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69c2",
        "name" : "T",
        "rank" : 9,
        "suit" : "SPADES",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69c3",
        "name" : "9",
        "rank" : 8,
        "suit" : "SPADES",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69c6",
        "name" : "6",
        "rank" : 5,
        "suit" : "SPADES",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69c8",
        "name" : "4",
        "rank" : 3,
        "suit" : "SPADES",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69c9",
        "name" : "3",
        "rank" : 2,
        "suit" : "SPADES",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69c7",
        "name" : "5",
        "rank" : 4,
        "suit" : "SPADES",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69ca",
        "name" : "2",
        "rank" : 1,
        "suit" : "SPADES",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69cb",
        "name" : "A",
        "rank" : 13,
        "suit" : "CLUBS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69cc",
        "name" : "K",
        "rank" : 12,
        "suit" : "CLUBS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69cd",
        "name" : "Q",
        "rank" : 11,
        "suit" : "CLUBS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69ce",
        "name" : "J",
        "rank" : 10,
        "suit" : "CLUBS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69d2",
        "name" : "7",
        "rank" : 6,
        "suit" : "CLUBS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69d1",
        "name" : "8",
        "rank" : 7,
        "suit" : "CLUBS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69cf",
        "name" : "T",
        "rank" : 9,
        "suit" : "CLUBS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69d3",
        "name" : "6",
        "rank" : 5,
        "suit" : "CLUBS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69d4",
        "name" : "5",
        "rank" : 4,
        "suit" : "CLUBS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69d5",
        "name" : "4",
        "rank" : 3,
        "suit" : "CLUBS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69d0",
        "name" : "9",
        "rank" : 8,
        "suit" : "CLUBS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69d6",
        "name" : "3",
        "rank" : 2,
        "suit" : "CLUBS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69da",
        "name" : "Q",
        "rank" : 11,
        "suit" : "DIAMONDS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69d9",
        "name" : "K",
        "rank" : 12,
        "suit" : "DIAMONDS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69d8",
        "name" : "A",
        "rank" : 13,
        "suit" : "DIAMONDS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69d7",
        "name" : "2",
        "rank" : 1,
        "suit" : "CLUBS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69db",
        "name" : "J",
        "rank" : 10,
        "suit" : "DIAMONDS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69e0",
        "name" : "6",
        "rank" : 5,
        "suit" : "DIAMONDS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69dc",
        "name" : "T",
        "rank" : 9,
        "suit" : "DIAMONDS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69df",
        "name" : "7",
        "rank" : 6,
        "suit" : "DIAMONDS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69dd",
        "name" : "9",
        "rank" : 8,
        "suit" : "DIAMONDS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69e2",
        "name" : "4",
        "rank" : 3,
        "suit" : "DIAMONDS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69e3",
        "name" : "3",
        "rank" : 2,
        "suit" : "DIAMONDS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69de",
        "name" : "8",
        "rank" : 7,
        "suit" : "DIAMONDS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69e4",
        "name" : "2",
        "rank" : 1,
        "suit" : "DIAMONDS",
        "__v" : 0
    },
    {
        "_id" : "5d038da49ec40621e3cc69e1",
        "name" : "5",
        "rank" : 4,
        "suit" : "DIAMONDS",
        "__v" : 0
    }
]

module.exports = DECK;