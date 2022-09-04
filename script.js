const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, arg) => {
        board[index] = arg;
    };

    const getField = (index) => {
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    };
    return { setField, getField, reset };
})();

const player = (type, name) => {
    this.type = type;
    this.name = name;

    const getType = () => {
        return type;
    }

    const getName = () => {
        return name;
    }

    const setName = (arg) => {
        name = arg;
    }

    return { getType, getName, setName };
}

const updateDisplay = (() => {
    const elements = document.querySelectorAll('#board-element');
    const status = document.getElementById('status');
    const reset = document.getElementById('reset');
    const container = document.getElementById('container');
    const welcomePrompt = document.getElementById('welcome');
    const nameSubmit = document.getElementById('name-submit');
    const playerXName = document.getElementsByClassName('player-X-name');
    const playerOName = document.getElementsByClassName('player-O-name');

    elements.forEach(element => {
        element.addEventListener('click', (e) => {
            index = Array.prototype.indexOf.call(elements, element);
            if (element.innerText !== '' || playGame.checkIfOver()) return;
            playGame.fillBoard(index, playGame.currentType());
            updateField();
            playGame.checkWinner();
        })
    })

    reset.addEventListener('click', () => {
        playGame.reset();
    })

    nameSubmit.addEventListener('click', () => {
        playGame.playerNames(playerXName[0].value, playerOName[0].value);
        container.style.filter = 'none';
        container.style.pointerEvents = 'auto';
        welcomePrompt.style.display = 'none';
    })

    const updateField = () => {
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerText = gameBoard.getField(i);
        }
    }

    const updateStatus = (arg) => {
        status.innerText = arg;
    }

    const winColour = (arg) => {
        for (let i = 0; i < arg.length; i++) {
            elements[arg[i]].classList.add('element-end');
        }
        document.getElementById('top-nav').style.animationName = 'marquee';
        document.getElementById('top-nav').style.animationDuration = '1s';
        reset.classList.add('reset-end');
    }

    const resetColour = () => {
        elements.forEach(element => {
            element.classList.remove('element-end');
        });
        document.getElementById('top-nav').style.animationName = 'none';
        reset.classList.remove('reset-end');
    }

    const winAnimation = () => {
        if(playGame.checkIfOver()) {
            status.classList.toggle('status-end');
            }
        else {
            status.classList.remove('status-end');
        }
    }

    const draw = () => {
        updateStatus('Its a Draw!');
        status.classList.add('status-end');
    }

    return { updateField, updateStatus, winColour, draw, winAnimation, resetColour };
})();

const playGame = (() => {
    const playerX = player('X', 'Player X');
    const playerO = player('O', 'Player O');
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
        for (let i = 0; i < winConditions.length; i++) {
            if (gameBoard.getField(winConditions[i][0]) !== '' && gameBoard.getField(winConditions[i][0]) === gameBoard.getField(winConditions[i][1]) && gameBoard.getField(winConditions[i][1]) === gameBoard.getField(winConditions[i][2])) {
                gameOver = true;
                announceWinner(previousType(currentType()));
                updateDisplay.winColour([winConditions[i][0], winConditions[i][1], winConditions[i][2]]);
                break;
            }
        }
    }

    const currentType = () => {
        if (match % 2 === 0) {
            return playerO.getType();
        } else {
            return playerX.getType();
        }
    }

    const previousType = (arg) => {
        if (arg === 'X') {
            return playerO.getName();
        } else {
            return playerX.getName();
        }
    }

    const currentName = () => {
        if (match % 2 === 0) {
            return playerO.getName();
        } else {
            return playerX.getName();
        }
    }

    const fillBoard = (index, type) => {
        gameBoard.setField(index, type);
        match++;
        updateDisplay.updateStatus(`${currentName()}'s turn`);
        if (match === 10 && gameOver === false) {
            updateDisplay.draw();
        }
    }

    const reset = () => {
        match = 1;
        gameOver = false;
        gameBoard.reset();
        updateDisplay.updateField();
        updateDisplay.updateStatus(`${currentName()}'s turn`);
        updateDisplay.winAnimation();
        updateDisplay.resetColour();
    }

    const playerNames = (name1, name2) => {
        if (name1 !== '' && name2 !== '') {
            playerX.setName(name1);
            playerO.setName(name2);
        }
        updateDisplay.updateStatus(`${currentName()}'s turn`);
    }

    const announceWinner = (name) => {
        updateDisplay.updateStatus(`${name} wins!`);
        updateDisplay.winAnimation();
    }
    return { fillBoard, currentType, reset, checkWinner, checkIfOver, playerNames };
})();

