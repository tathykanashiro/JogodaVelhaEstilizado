const boardTable = document.querySelector('.board__game');
const gameOverDialog = document.querySelector('.game__over__dialog');
const gameOverMessage = document.querySelector('.game__over__message');
const restartButton = document.querySelector('.restart__button');

boardTable.addEventListener('click', setPlayerMove);
restartButton.addEventListener('click', startGame);

let currentPlayer, 
    winner, 
    isGameOver, 
    turn;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
]

function startGame(){
    currentPlayer = 'X';
    winner = null;
    isGameOver = false;
    turn = 0;
    boardTable.style.setProperty('--current__player', '"X"');
    hideGameOverDialog();
    clearBoard();
}

function clearBoard(){
    boardTable.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
}

function setPlayerMove({target}){
    if(!isGameOver && target.classList.contains('cell') && target.innerText === ''){
        target.innerText = currentPlayer;
        turn++;
        if(turn > 4){
            checkGameOver();
        }
        togglePlayer();
    }
}

function togglePlayer(){
    if( currentPlayer === 'X'){
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    boardTable.style.setProperty('--current__player',`"${currentPlayer}"`);

    /* OU  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; */
}

function checkGameOver(){
    winner = checkWinner();
    if(winner){
        showGameOverDialog(`Vitória do ${winner}!`);
    } else if(turn > 8) {
        showGameOverDialog(`Deu velha!`);
    }
}

function checkWinner(){
    let cells = boardTable.querySelectorAll('.cell');
    cells = Array.from(cells).map(element => element.innerText);
    const values = winningConditions.map(condition => condition.map(position => cells[position]).join(''));
    const isOWinner = values.includes('OOO');
    const isXWinner = values.includes('XXX');

    if(isOWinner || isXWinner){
        isGameOver = true;
        if(isOWinner){
            return 'O';
        }
        return 'X';
    }
    return null;
}

function showGameOverDialog(message){
    gameOverMessage.innerText = message;
    gameOverDialog.setAttribute('open', 'true');
}

function hideGameOverDialog(){
    gameOverDialog.removeAttribute('open');
}

startGame();