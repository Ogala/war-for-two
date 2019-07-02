# War - For Two

A Node.js implementation of the War game for two players.

My goal was to implement a server that plays the card game
[War for 2 players](https://www.pagat.com/war/war.html#two). 

The following endpoints are available.

- `PUT /game` -> `{"id": <string>}`

  Starts a new game of war and returns the game's id.

- `GET /game/:id` -> `{"playerOne": <number>, "playerTwo": <number>}`

  Gets the status of the identified game, returning the number of cards each
  player has in their deck.

- `POST /game/:id/play` -> `{"winner": <string>, "playerOne": {"deck": <number>, "cards": <array>}, "playerTwo": ...}`

  Runs one battle, including resolving any ties. The response should identify
  the winner, and show the cards each player played as well as their new deck
  sizes.

## Installation

### Option 1
#### Requirements
1. Docker/docker-compose

#### Steps
1. `cd` into the project dir
2. run `docker-compose build`
3. run `docker-compose up`. App will be listening on `port:8080`
4. `cd` into the `tester` folder and run `node tester.js`

### Option 2
#### Requirements
1. Node.js > v10.15
2. Mongodb

### Steps
1. Start mongodb
2. `cd` into project folder
3. Run `npm install`
4. Run `npm start`
5. Run test as described in step 4 of Option 1

## Dependencies
1. Mongodb


