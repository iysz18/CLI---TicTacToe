// All module imports
const readline = require("readline");

// Create the players
const playerModule = (() => {
    // create players array
    const players = {
        X: {token: " X ", turn: true},
        O: {token: " O ", turn: false},
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
    const switchTurn = (currentTurn) => {
        return currentTurn = currentTurn === players.X ? players.O : players.X;
    };
    
    return {
        getPlayerToken,
        getTurn,
        switchTurn,
    };
})();

// Function to create cells containing object holding information about token
const createCell = () => {
    let token = null;
    const getToken = () => token;
    const setToken = (player) => token = player;
    
    return {
        getToken,
        setToken,
    };
};

// Generate the gameboard 3x3 and insert cells 
const generateBoard = () => {
    const gameboard = [];
    for (let i = 0; i < 3; i++) {
        gameboard[i] = [];  // Initialize each row
        for (let j = 0; j < 3; j++) {
            gameboard[i][j] = createCell();  // Fill each cell with a createCell() object
        }
    }
    return gameboard;  // Return the 2D array
};

// Beacuse its the CLI version, we need to receive the input with readline
function getMove(currentTurn, board, playTurn) {
    // Create an interface for input/output
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Ask a question
    rl.question(`Player ${currentTurn.token} enter (e.g 0,1): `, (coords) => {
        let [row, col] = coords.split(",").map(Number);
        // place these coordinates on the board with the players token
        board[row][col].setToken(currentTurn.token);
        // Close the interface after the input is processed
        rl.close();
        playTurn();
    });
}

// Function the update the board (render)
const renderBoard = (board) => {
    return board.map(row => 
        row.map(cell => cell.getToken() || " . ").join(" ")
    ).join("\n");
};
const gameController = () => {
    let movesLeft = 9;
    // generate the board
    const board = generateBoard();
    const playTurn = () => {
        console.log(renderBoard(board));
        movesLeft--;
    };
    getMove(playerModule.getTurn(), board, playTurn);
    // switch turns
    playerModule.switchTurn();
};

// Run the TicTacToe game
gameController();