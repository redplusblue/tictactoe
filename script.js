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
    const board = document.getElementById('board');
    
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

    const winColour = (arg) => {
        for(let i =0; i < arg.length; i++) {
            elements[arg[i]].style.backgroundColor = '#14C38E';
            elements[arg[i]].style.color = 'white';
            elements[arg[i]].style.animation = 'rotate 1s ease-in-out';
        }
        document.getElementById('top-nav').style.animationName = 'marquee';
        document.getElementById('top-nav').style.animationDuration = '1s';
        reset.style.animationName = 'wiggle';
        reset.style.animationDuration = '3s';
        reset.style.animationIterationCount = '3';

    }

    const draw = () => {
        board.style.opacity = '60%';
        reset.style.animationName = 'wiggle';
        reset.style.animationDuration = '3s';
        reset.style.animationIterationCount = '3';
    }

    return { updateField, updateStatus, winColour, draw };
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
                updateDisplay.winColour([winConditions[i][0], winConditions[i][1], winConditions[i][2]]);
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
            updateDisplay.updateStatus('Its a Draw!');
            updateDisplay.draw();
        }
    }

    const reset = () => {
        location.reload();
    }

    const announceWinner= (type) => {
        updateDisplay.updateStatus(`Player ${type} wins!`);
    }
    return { fillBoard, currentType, reset, checkWinner, checkIfOver };
})();

