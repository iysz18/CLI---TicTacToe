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

const board = generateBoard();
console.log(board);