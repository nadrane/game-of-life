const boardWidth = 3;
const boardHeight = 3;
let board = [[true, true, true], [true, false, true], [true, false, false]];

function tableCreate(rows, columns) {
  const board = document.getElementById('board');
  const tbl = document.createElement('table');
  const tblBody = document.createElement('tbody');

  for (let j = 0; j < rows; j++) {
    const row = document.createElement('tr');

    for (let i = 0; i < columns; i++) {
      const cell = document.createElement('td');
      row.appendChild(cell);
    }

    tblBody.appendChild(row);
  }

  tbl.appendChild(tblBody);
  board.appendChild(tbl);
}

/* This is a higher order function that allows interacts with the DOM and allows you to run a function against every single cell */
function forEachCell(iterator) {
  const cells = document.querySelectorAll('td');
  cells.forEach((cell, idx) => iterator(cell, idx));
}

/* The job of this function is to take an array representing the state of the board
   and to use it to modify the classes of each cell in the DOM to its new value.
*/

function makeCellAlive(cell) {
  cell.classList.add('alive');
}

function makeCellDead(cell) {
  cell.classList.remove('alive');
}

function toggleCellLiveness(cell) {
  cell.classList.toggle('alive');
}

function render(board) {
  const getCoords = idx => ({
    column: idx % boardWidth,
    row: Math.floor(idx / boardWidth)
  });

  forEachCell((cell, idx) => {
    // We are destructuring the object returns from getCoords higher
    // This is sometimes referred to as destructured assignment
    const { row, column } = getCoords(idx);

    // If the cell is alive on the next turn
    if (board[row][column]) {
      makeCellAlive(cell);
    } else {
      makeCellDead(cell);
    }
  });
}

/* I would recommend representing the state of your game as an array of nested arrays.
   In essence, the arrays represent a large grid
   Each innermost array will contain a boolean value that indicates if a particular cell is alive or dead

   This functions job is to return an array of array, whose width and height matches
   the parameters passed in
*/
function initializeBoard(width, height) {}

/* This function will take in an array of arrays that represents all the cells in the board.
   Each element in these arrays is either true or false.
   If an element is true, it represents a living cell
   if an element is false, it represents a dead cell

   RULES
       Any live cell with fewer than two live neighbors dies, as if by underpopulation.
       Any live cell with two or three live neighbors lives on to the next generation.
       Any live cell with more than three live neighbors dies, as if by overpopulation.
       Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.


   You're job is to process all of the cells, modify their states from living to dead or dead to living
   and then to return the resulting array
*/
function transform(board) {
  return board;
}

function handleClick(e) {
  toggleCellLiveness(e.target);
}

function handleStepClick(e) {
  const playButton = document.getElementById('step');
  playButton.addEventListener('click', () => {
    board = transform(board);
    render(board);
  });
}

/*
  How can we make it so that our board updates at a regularly interval?
*/
function handlePlayClick(e) {}

tableCreate(3, 3);
// render(board);
forEachCell(cell => {
  cell.addEventListener('click', handleClick);
});
