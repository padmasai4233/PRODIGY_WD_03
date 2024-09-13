const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) {
        return;
    }

    updateBoard(index);
    checkForWinner();
}

function updateBoard(index) {
    board[index] = currentPlayer;
    document.querySelector(`[data-index='${index}']`).textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) 
    {
        statusText.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
        gameActive = false;
    } 
    else if (!board.includes('')) 
    {
        statusText.textContent = `It's a draw!`;
        gameActive = false;
        
    } 
    else
    {
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    statusText.textContent = `Player X's turn`;
    gameActive = true;
}
