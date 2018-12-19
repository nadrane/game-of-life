const boardWidth = 5;
const boardHeight = 5;
let board = [];

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

  This functions job is create the data structure that render expects.
  It should match the supplied width and height.
  You probably want to initialize each cell as dead.

  Once you're finished, you should be able to click around the board,
  making the cell you click on alive.
*/
function initializeBoard(width, height) {
  board = [];
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

function transform(existingBoard) {
  const newBoard = initializeBoard(boardWidth, boardHeight);
  for (let row = 0; row < boardHeight; row++) {
    for (let column = 0; column < boardWidth; column++) {
      const livingNeighbors = getNumberLivingNeighbors(existingBoard, row, column);
      if (livingNeighbors < 2) {
        newBoard[row][column] = false;
      } else if (livingNeighbors > 3) {
        newBoard[row][column] = false;
      } else if (livingNeighbors === 3) {
        newBoard[row][column] = true;
      } else if (livingNeighbors === 2) {
        newBoard[row][column] = existingBoard[row][column];
      }
    }
  }
  return newBoard;
}

/*
  This helper function will probably be super helpful when writing the transform function
  Do we want to deal with wrapping if we get to the edge of the board?
*/
function getNumberLivingNeighbors(board, row, column) {
  return getNeighbors(row, column).filter(({ row, column }) => board[row][column]).length;
}
function getNeighbors(row, column) {
  const neighbors = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      const newRow = row + j;
      const newColumn = column + i;

      if (newRow < 0 || newColumn < 0 || newColumn >= boardWidth || newRow >= boardHeight) {
        continue;
      }

      neighbors.push({
        row: newRow,
        column: newColumn
      });
    }
  }
  return neighbors;
}

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
    stepButton.addEventListener('click', () => {
      board = transform(board);
      render(board);
    });
  }

  /*
    BONUS

    It would be nice if we didn't need to click step every time we
    wanted to advance the state of the game.
    How can we make it so that our board updates at a regularly interval?
    Note: You will need to edit the index.html to make this work
  */
  function registerPlayButton() {
    const playButton = document.getElementById('play');

    playButton.addEventListener('click', () => {
      setInterval(() => {
        render(transform(board));
      }, 1000);
    });
  }

  /*
    BONUS

    It would be nice if we could completely reset the board
    Note: You will need to edit the index.html to make this work

  */
  function registerResetButton() {
    const resetButton = document.getElementById('reset');

    resetButton.addEventListener('click', () => {
      board = initializeBoard(boardWidth, boardHeight);
      render(board);
    });
  }

  // What does || do again?
  // Why might I have included it here?
  // Should it stay after we've finished implementing initializeBoard?
  board = initializeBoard(boardWidth, boardHeight) || [];
  tableCreate(boardWidth, boardHeight);
  registerStepButton();
  registerPlayButton();
  registerCellClick();
  registerResetButton();
}

initializeGameOfLife();
