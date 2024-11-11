// All module imports
const readline = require("readline");

// Create the players
const playerModule = (() => {
    // create players array
    const players = {
        X: {token: "X", turn: true},
        O: {token: "O", turn: false},
    };

    const currentTurn = players.X;

    // Getter functions for getting the player and the player with current turn
    const getPlayerToken = (token) => {
        if(token in players) {
            return players[token].token;
        } else 
            return `Error! Player ${token} doesn't exist.`;
    };
    // This just returns the currentTurn variable
    const getTurn = () => currentTurn;

    return {
        getPlayerToken,
        getTurn,
    };
})();

// Function to create cells containing object holding information about token
const createCell = () => {
    const token = null;
    const getToken = () => token;
    
    return {
        getToken,
    };
};

// Generate the gameboard 3x3 and insert cells 
const generateBoard = () => {
    const gameboard = [];
    for (let i = 0; i < 3; i++) {
        gameboard[i] = [];
        for (let j = 0; j < 3; j++) {
            gameboard[i][j] = createCell();
        }
    }
    
    return gameboard;
};

// Beacuse its the CLI version, we need to receive the input with readline
const getMove = () => {
 const createRL = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question("");
 };

};

const gameController = () => {
    let movesLeft = 9;
    while (movesLeft > 0 && !winner) {
        //  switch turn between players

    }
};