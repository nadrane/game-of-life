const boardWidth = 5;
const boardHeight = 5;

/*
  This function is respnsible for creating a grid using HTML table elements
  You should not need to edit it.
*/
function tableCreate(width, height) {
  const board = document.getElementById('board');
  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');

  for (let j = 0; j < height; j++) {
    const row = document.createElement('tr');

    for (let i = 0; i < width; i++) {
      const cell = document.createElement('td');
      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  }

  table.appendChild(tableBody);
  board.appendChild(table);
}

/*
  This is a higher order function that allows interacts with the DOM and
  allows you to run a function against every single cell.
  You should not need to edit it.
*/
function forEachCell(iterator) {
  const cells = document.querySelectorAll('td');

  const getCoords = idx => ({
    column: idx % boardWidth,
    row: Math.floor(idx / boardWidth)
  });

  cells.forEach((cell, idx) => iterator(cell, getCoords(idx)));
}

function makeCellAlive(cell) {
  cell.classList.add('alive');
}

function makeCellDead(cell) {
  cell.classList.remove('alive');
}

function toggleCellLiveness(cell) {
  cell.classList.toggle('alive');
}

/*
  The job of this function is to take an array representing the state of the board
  and to use it to modify the classes of each cell in the DOM to its new value.
  You should not need to edit it.
*/
function render(board) {
  // We are destructuring the object returns from getCoords higher
  // This is sometimes referred to as destructured assignment
  forEachCell((cell, { row, column }) => {
    // If the cell is alive on the next turn
    if (board[row][column]) {
      makeCellAlive(cell);
    } else {
      makeCellDead(cell);
    }
  });
}

/*
  START HERE

  The render function above expects you to represent the state of your
  game as an array of nested arrays, whose innermost elements contain booleans
  that indicate if a particular cell is alive or dead.
  A value of true indicates that a cell is alive.
  A value of false indicates that a cell is dead.

  This functions job is to return an array of arrays, whose width and height matches
  the parameters passed in
*/
function initializeBoard(width, height) {
  const board = [];
  for (let row = 0; row < height; row++) {
    const newRow = [];
    board.push(newRow);
    for (let column = 0; column < width; column++) {
      newRow.push(false);
    }
  }
  return board;
}

/*
  IMPLEMENT ME

  This function will take in the board created by initializeBoard and will
  apply the game of life rules to that board, returning a new one. More specifically,
  You're job is to process all of the cells, modify their states from alive (true) to dead (false) or from dead to living and then to return the resulting array.

   RULES
       Any live cell with fewer than two live neighbors dies, as if by underpopulation.
       Any live cell with two or three live neighbors lives on to the next generation.
       Any live cell with more than three live neighbors dies, as if by overpopulation.
       Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
*/
function transform(board) {}

function initializeGameOfLife() {
  function registerCellClick() {
    forEachCell((cell, { row, column }) => {
      cell.addEventListener('click', () => {
        // Remember that the board contains boolean values
        // This line toggles the boolean value.
        // If it's true, make it false
        // If it's false, make it true
        board[row][column] = !board[row][column];
        render(board);
      });
    });
  }

  function registerStepButton(e) {
    const stepButton = document.getElementById('step');

    /*
      IMPLEMENT ME

      What should happen when the step button is clicked?
      You should be able to implement this is a couple lines.
      You might need to use a function that I wrote
    */
    stepButton.addEventListener('click', () => {});
  }

  /*
    BONUS

    It would be nice if we didn't need to click step every time we
    wanted to advance the state of the game.
    How can we make it so that our board updates at a regularly interval?
    Note: You will need to edit the index.html to make this work
  */
  function registerPlayButton() {}

  board = initializeBoard(boardWidth, boardHeight);
  tableCreate(boardWidth, boardHeight);
  registerStepButton();
  registerPlayButton();
  registerCellClick();
}

initializeGameOfLife();
render(board);
