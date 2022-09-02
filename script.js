const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, arg) => {
        board[index]= arg;
    };

    const getField = (index) => {
        return board[index];
    };

    const reset = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    };
    return { setField, getField, reset };
})();

const player = (type) => {
    this.type = type;
    
    const getType = () => {
        return type;
    }
    
    return { getType };
}

const updateDisplay = (() => {
    const elements = document.querySelectorAll('#board-element');
    const status = document.getElementById('status');
    const reset = document.getElementById('reset');
    
    elements.forEach(element => {
        element.addEventListener('click', (e) => {
            index = Array.prototype.indexOf.call(elements, element);
            if(element.innerText !== '' || playGame.checkIfOver()) return;
            playGame.fillBoard(index, playGame.currentType());
            updateField();
            playGame.checkWinner();
        })
    })

    reset.addEventListener('click', () => {
        playGame.reset();
    })

    const updateField = () => {
        for(let i = 0; i < elements.length; i++) {
            elements[i].innerText = gameBoard.getField(i);
        }
    }

    const updateStatus = (arg) => {
        status.innerText = arg;
    }

    return { updateField, updateStatus };
})();

const playGame = (() =>{
    const playerX = player('X');
    const playerO = player('O');
    let match = 1;
    let gameOver = false;

    const checkIfOver = () => {
        return gameOver;
    }

    const checkWinner = () => {
        winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for(let i = 0; i < winConditions.length; i++) {
            if(gameBoard.getField(winConditions[i][0]) !== '' && gameBoard.getField(winConditions[i][0]) === gameBoard.getField(winConditions[i][1]) && gameBoard.getField(winConditions[i][1]) === gameBoard.getField(winConditions[i][2])) {
                announceWinner(gameBoard.getField(winConditions[i][0]));
                gameOver = true;
                break;
            }  
        }
    }
    
    const currentType = () => {
        if(match % 2 === 0) {
            return playerO.getType();
        } else {
            return playerX.getType();
        }
    }

    const fillBoard = (index, type) => {
        gameBoard.setField(index, type);
        match++;
        updateDisplay.updateStatus(`Player ${currentType()}'s turn`);
        if(match === 10) {
            updateDisplay.updateStatus('Game Over!');
        }
    }

    const reset = () => {
        gameBoard.reset();
        updateDisplay.updateField();
        match = 1;
        gameOver = false;
        updateDisplay.updateStatus(`Player ${currentType()}'s turn`);
    }

    const announceWinner= (type) => {
        updateDisplay.updateStatus(`Player ${type} wins!`);
    }
    return { fillBoard, currentType, reset, checkWinner, checkIfOver };
})();


// let newPlayer = player();
// newPlayer.playerTurn(newPlayer.type);


// for(let i = 0; i < elements.length; i++) {
//     console.log(i)
//     elements[i].addEventListener('click', () => {
//         if(i+2 % 2 === 0) {
//         newPlayer.clicked(i, 'X');
//         } else {
//             newPlayer.clicked(i, 'Y');
//         }
//     })
// }