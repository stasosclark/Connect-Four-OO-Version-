/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
class Game {
  constructor(width, height, player1, player2) {
    this.width = width;
    this.height = height;
    this.board = [];
    this.player1 = player1;
    this.player2 = player2;
    this.currPlayer = player1;
  }
  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }

  makeHtmlBoard() {
    const htmlBoard = document.getElementById("board");

    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", this.handleClick.bind(this));

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }

    htmlBoard.append(top);

    // make main part of board
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }

      htmlBoard.append(row);
    }
  }
  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }
  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.backgroundColor = this.currPlayer.color; ///////////////
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }
  endGame(msg) {
    alert(msg);
    this.board = [];
    this.makeBoard();
    makeForm();
    let htmlBoard = document.getElementById("board");
    htmlBoard.innerHTML = "";
  }
  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer.number; ///////////////////
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer.number} won!`); /////////////////
    }

    // check for tie
    if (this.board.every((row) => row.every((cell) => cell))) {
      return this.endGame("Tie!");
    }

    // switch players
    if (this.currPlayer === this.player1) {
      this.currPlayer = this.player2;
    } else {
      this.currPlayer = this.player1;
    }
    // this.currPlayer = this.currPlayer === 1 ? 2 : 1; //////////////////
  }
  checkForWin() {
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer.number ////////////////////
      );
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];
        // find winner (only checking each win-possibility as needed)
        if (
          _win.call(this, horiz) ||
          _win.call(this, vert) ||
          _win.call(this, diagDR) ||
          _win.call(this, diagDL)
        ) {
          return true;
        }
      }
    }
  }
}

class Player {
  constructor(number, color) {
    this.number = number;
    this.color = color;
  }
}

let game = new Game(6, 7);

function makeForm() {
  const form = document.createElement("form");
  document.querySelector("body").prepend(form);

  const div1 = document.createElement("div");
  form.prepend(div1);

  const p1Label = document.createElement("label");
  p1Label.innerText = "Player 1: Select your color: ";
  div1.append(p1Label);

  const p1Color = document.createElement("select");
  p1Color.setAttribute("required", "");
  div1.append(p1Color);

  const orange1 = document.createElement("option");
  orange1.innerText = "orange";
  p1Color.append(orange1);

  const red1 = document.createElement("option");
  red1.innerText = "red";
  p1Color.append(red1);

  const yellow1 = document.createElement("option");
  yellow1.innerText = "yellow";
  p1Color.append(yellow1);

  const blue1 = document.createElement("option");
  blue1.innerText = "blue";
  p1Color.append(blue1);

  const green1 = document.createElement("option");
  green1.innerText = "green";
  p1Color.append(green1);

  const div2 = document.createElement("div");
  form.append(div2);

  const p2Label = document.createElement("label");
  p2Label.innerText = "Player 2: Select your color: ";
  div2.append(p2Label);

  const p2Color = document.createElement("select");
  p2Color.setAttribute("required", "");
  div2.append(p2Color);

  const orange2 = document.createElement("option");
  orange2.innerText = "orange";
  p2Color.append(orange2);

  const red2 = document.createElement("option");
  red2.innerText = "red";
  p2Color.append(red2);

  const yellow2 = document.createElement("option");
  yellow2.innerText = "yellow";
  p2Color.append(yellow2);

  const blue2 = document.createElement("option");
  blue2.innerText = "blue";
  p2Color.append(blue2);

  const green2 = document.createElement("option");
  green2.innerText = "green";
  p2Color.append(green2);

  const startBtn = document.createElement("button");
  startBtn.innerText = "Start A New Game";
  form.append(startBtn);
  startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (p1Color.value === p2Color.value) {
      alert("Player 1 and Player 2 must select different colors!");
    } else {
      let player1 = new Player(1, p1Color.value);
      let player2 = new Player(2, p2Color.value);
      let game = new Game(6, 7, player1, player2);
      game.makeBoard();
      game.makeHtmlBoard();
      form.innerHTML = "";
    }
  });
}

makeForm();

// const WIDTH = 7;
// const HEIGHT = 6;

// let currPlayer = 1; // active player: 1 or 2
// let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */

// function makeBoard() {
//   for (let y = 0; y < HEIGHT; y++) {
//     board.push(Array.from({ length: WIDTH }));
//   }
// }

/** makeHtmlBoard: make HTML table and row of column tops. */

// function makeHtmlBoard() {
//   const board = document.getElementById('board');

//   // make column tops (clickable area for adding a piece to that column)
//   const top = document.createElement('tr');
//   top.setAttribute('id', 'column-top');
//   top.addEventListener('click', handleClick);

//   for (let x = 0; x < WIDTH; x++) {
//     const headCell = document.createElement('td');
//     headCell.setAttribute('id', x);
//     top.append(headCell);
//   }

//   board.append(top);

//   // make main part of board
//   for (let y = 0; y < HEIGHT; y++) {
//     const row = document.createElement('tr');

//     for (let x = 0; x < WIDTH; x++) {
//       const cell = document.createElement('td');
//       cell.setAttribute('id', `${y}-${x}`);
//       row.append(cell);
//     }

//     board.append(row);
//   }
// }

/** findSpotForCol: given column x, return top empty y (null if filled) */

// function findSpotForCol(x) {
//   for (let y = HEIGHT - 1; y >= 0; y--) {
//     if (!board[y][x]) {
//       return y;
//     }
//   }
//   return null;
// }

/** placeInTable: update DOM to place piece into HTML table of board */

// function placeInTable(y, x) {
//   const piece = document.createElement('div');
//   piece.classList.add('piece');
//   piece.classList.add(`p${currPlayer}`);
//   piece.style.top = -50 * (y + 2);

//   const spot = document.getElementById(`${y}-${x}`);
//   spot.append(piece);
// }

/** endGame: announce game end */

// function endGame(msg) {
//   alert(msg);
// }

/** handleClick: handle click of column top to play piece */

// function handleClick(evt) {
//   // get x from ID of clicked cell
//   const x = +evt.target.id;

//   // get next spot in column (if none, ignore click)
//   const y = findSpotForCol(x);
//   if (y === null) {
//     return;
//   }

//   // place piece in board and add to HTML table
//   board[y][x] = currPlayer;
//   placeInTable(y, x);

//   // check for win
//   if (checkForWin()) {
//     return endGame(`Player ${currPlayer} won!`);
//   }

//   // check for tie
//   if (board.every(row => row.every(cell => cell))) {
//     return endGame('Tie!');
//   }

//   // switch players
//   currPlayer = currPlayer === 1 ? 2 : 1;
// }

/** checkForWin: check board cell-by-cell for "does a win start here?" */

// function checkForWin() {
//   function _win(cells) {
//     // Check four cells to see if they're all color of current player
//     //  - cells: list of four (y, x) cells
//     //  - returns true if all are legal coordinates & all match currPlayer

//     return cells.every(
//       ([y, x]) =>
//         y >= 0 &&
//         y < HEIGHT &&
//         x >= 0 &&
//         x < WIDTH &&
//         board[y][x] === currPlayer
//     );
//   }

//   for (let y = 0; y < HEIGHT; y++) {
//     for (let x = 0; x < WIDTH; x++) {
//       // get "check list" of 4 cells (starting here) for each of the different
//       // ways to win
//       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
//       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
//       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
//       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

//       // find winner (only checking each win-possibility as needed)
//       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
//         return true;
//       }
//     }
//   }
// }

// makeBoard();
// makeHtmlBoard();
