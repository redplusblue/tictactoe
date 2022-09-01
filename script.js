let elements = document.querySelectorAll('#board-element');
let numCount = 0;
let mode = 'X';


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

for(let i = 0; i < elements.length; i++) {
    console.log(i)
    elements[i].addEventListener('click', () => {
        newPlayer.clicked(i)
    })
}