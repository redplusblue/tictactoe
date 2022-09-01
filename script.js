let elements = document.querySelectorAll('#board-element');
let numCount = 0;

const gameBoard = () => {
    let board = [];
    elements.forEach(element => {
        board.push(element.innerText);
    });
    let changeBoard = (arg, a) => {
        board[a] = arg;
        for(let i = 0; i < board.length; i++) {
            elements[i].innerText = board[i];
        }
    }
    return {x : (a) => {changeBoard('X', a)}, 
            o : (a) => {changeBoard('O', a)}, 
            get : (a) => board[a]};
}

const player = () => {
    let mode = 'X';
    const board = gameBoard();
    const clicked = (index) => {
        if(mode = 'X') {
            board.x(index)
            mode = 'O';
        } else {
            board.o(index)
            mode = 'X'
        }
    }
    return {clicked: (a) => clicked(a)}
}

const board = gameBoard();
console.log(board.get(8));
board.o(8)
newPlayer = player(); 

elements.forEach(element => {
    if(element.innerText == '')
    {
        element.addEventListener('click', () => {
            console.log("Ok Clicked")
            console.log(numCount)
            newPlayer.clicked(numCount)
        })
    }
    numCount += 1;
})