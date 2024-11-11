// All module imports
const readline = require("readline");

// Create the players
const playerModule = (() => {
    const players = {
        X: {token: " X ", turn: true},
        O: {token: " O ", turn: false},
    };

    let currentTurn = players.X;

    const getPlayerToken = (token) => {
        if (token in players) {
            return players[token].token;
        } else 
            return `Error! Player ${token} doesn't exist.`;
    };

    const getCurrentTurn = () => currentTurn;
    const getTurn = () => currentTurn;
    
    const switchTurn = () => {
        currentTurn = currentTurn === players.X ? players.O : players.X;
    };
    
    return {
        getPlayerToken,
        getTurn,
        switchTurn,
        getCurrentTurn,
    };
})();

// Function to create cells holding token information
const createCell = () => {
    let token = null;
    const getToken = () => token;
    const setToken = (player) => token = player;
    
    return { getToken, setToken };
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

// Get player move and update the board
function getMove(currentTurn, board, playTurn) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(`Player ${currentTurn.token} enter (e.g 0,1): `, (coords) => {
        let [row, col] = coords.split(",").map(Number);
        // place these coordinates on the board with the player's token
        board[row][col].setToken(currentTurn.token);
        rl.close();
        playTurn(); // Call playTurn after the move is placed
    });
}

// Render the board to display
const renderBoard = (board) => {
    return board.map(row => 
        row.map(cell => cell.getToken() || " . ").join(" ")
    ).join("\n");
};

// Check for winner
function checkWinner(board) {
    // Check all rows
    for (let row = 0; row < 3; row++) {
        if (board[row][0].getToken() && 
            board[row][0].getToken() === board[row][1].getToken() &&
            board[row][1].getToken() === board[row][2].getToken()) {
            return board[row][0].getToken(); // Return the winning player
        }
    }

    // Check all columns
    for (let col = 0; col < 3; col++) {
        if (board[0][col].getToken() && 
            board[0][col].getToken() === board[1][col].getToken() &&
            board[1][col].getToken() === board[2][col].getToken()) {
            return board[0][col].getToken(); // Return the winning player
        }
    }

    // Check diagonals
    if (board[0][0].getToken() && 
        board[0][0].getToken() === board[1][1].getToken() &&
        board[1][1].getToken() === board[2][2].getToken()) {
        return board[0][0].getToken(); // Diagonal check
    }

    if (board[0][2].getToken() && 
        board[0][2].getToken() === board[1][1].getToken() &&
        board[1][1].getToken() === board[2][0].getToken()) {
        return board[0][2].getToken(); // Diagonal check
    }

    return null; // No winner found
}

// Main function controlling the game
const gameController = () => {
    let movesLeft = 9;
    const board = generateBoard();
    
    const playTurn = () => {
        console.log(renderBoard(board)); // Display board after each move

        const winner = checkWinner(board);
        if (winner) {
            console.log(`Player ${winner} wins!`);
            return; // End the game if there's a winner
        }

        if (movesLeft === 0) {
            console.log(`Game Over - it's a draw!`);
            return; // End of game if no moves left
        }

        // Continue the game with the next move
        movesLeft--;
        playerModule.switchTurn(); // Switch turns
        getMove(playerModule.getTurn(), board, playTurn); // Ask for the next move
    };

    playTurn(); // Start the first turn
};

// Run the TicTacToe game
gameController();