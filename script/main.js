const cellComponents = {
    row: 0,
    col: 0,
    isMine: false,
    isRevealed: false,
    userTag: "",
    isWrongTagged: false,
    numberOfMinesAround: 0
}

const BOMB_ICON = '&#128163;';
const EXCLAMASION_SYMBOL = "!";
const QUESTION_SYMBOL = "?";
const HAPPY_FACE = '&#128513;';
const BORED_FACE = '&#128528;';
const SAD_FACE = '&#128533;';

let time = document.getElementById("time-counter");
let statusFace = document.getElementById("button-status");

let interval = null;
let cols = 8;
let rows = 8;
let untagedMineCounter = 10;
let bombCount = 0;
let totalMinesInBoard = 0;
let remainingUntaggedMineCounter = 0;
let countSeconds = 0;
let gameOver = false;

let mockdata = getMockDataParam('mockdata');
let infoFieldMine;// = createBoard(untagedMineCounter, cols, rows);


window.onload = () => {
    initGame();
  
    eventClickButtonReset();
}

function initGame() {

    if (!window.location.search.includes("?")) {
        infoFieldMine = createBoard(untagedMineCounter, cols, rows)
        createBoardDOM(rows, cols);        
        setNumAdjacentsMines(infoFieldMine);

    } else {
        infoFieldMine = createMockDataBoard(mockdata);
        rows = infoFieldMine.length;
        cols = infoFieldMine[0].length;
        createBoardDOM(rows, cols);
        setNumAdjacentsMines(infoFieldMine);
    }
    displayUntaggedMineCount();

}

function getMockDataParam(mockdataParam) {
    const parameters = new URLSearchParams(window.location.search);
    let mockDataValue = parameters.get(mockdataParam);
    if (parameters.has('mockdata')) {
        mockDataValue = mockDataValue.split('-');
    }
    return mockDataValue;
}

function createMockDataBoard(mockdataBoard) {
    const board = [];
    for (let i = 0; i < mockdataBoard.length; i++) {
        board.push([]);
        for (let j = 0; j < mockdataBoard[i].length; j++) {
            board[i].push({
                ...cellComponents,
                row: i,
                col: j,
                isMine: mockdataBoard[i][j] === 'x'
            });
            if (mockdataBoard[i][j] === 'x') {
                bombCount++;
               
            }
        }
    }
    totalMinesInBoard = bombCount;
    return board;
}


function createBoardDOM(numRows, numCols) {
    resetBoard();
    let table = document.getElementById("field-mines");
    for (let i = 0; i < numRows; i++) {
        let row = createRow(i, numCols);
        table.appendChild(row);
    }
}

function createRow(idRow, numCols) {
    let colTr = document.createElement("tr");
    for (let col = 0; col < numCols; col++) {
        let cell = createCell(idRow, col);
        colTr.appendChild(cell);
    }
    return colTr;
}

function createCell(idRow, idCol) {
    let cell = document.createElement("td");
    let cellId = idRow + '-' + idCol;
    cell.setAttribute("id", cellId);
    cell.setAttribute("data-testid", idRow + '-' + idCol);
    cell.classList.add("covered");
    eventCellClick(cell);
    //eventCellClick(row, col)
    return cell;
}

function createBoard(numMines, numRows, numCols) {
    const board = [];
    for (let i = 0; i < numRows; i++) {
        board.push([]);
        for (let j = 0; j < numCols; j++) {
            board[i].push({
                ...cellComponents,
                row: i,
                col: j,
            });
        }
    }
    setMinesRandom(numMines, board);
    return board;
}

function setMinesRandom(numMines, board) {
    let remainingUntaggedMineCounter = numMines;
    while (remainingUntaggedMineCounter > 0) {
        let row = Math.floor(Math.random() * board.length);
        let col = Math.floor(Math.random() * board[0].length);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;            
            remainingUntaggedMineCounter -= 1;
            bombCount++;
            untagedMineCounter = bombCount;
        }
    }
    totalMinesInBoard = numMines;
}

function numAdjacentMines(row, col) {
    let mines = 0;
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (isValidPosition(i, j)) {
                if (infoFieldMine[i][j].isMine == true) {
                    mines++;
                }
            }
        }
    }
    return mines;
}

function isValidPosition(i, j) {
    return i >= 0 && i < infoFieldMine.length && j >= 0 && j < infoFieldMine[i].length
}

function setNumAdjacentsMines(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            infoFieldMine[i][j].numberOfMinesAround = numAdjacentMines(i, j);
        }
    }
}

function revealNegighbors(row, col) {
    console.log(row + 1, col + 1);
    row = parseInt(row);
    col = parseInt(col);
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (isValidPosition(i, j)) {
                if (i != row || j != col) {
                    revealCell(i, j);
                }
            }
        }
    }
}

function eventCellClick(cells) {
    
    cells.addEventListener("click", (e) => {
        e.preventDefault();
        let idCell = e.target.id;
        let rowCol = idCell.split("-");
        let row = rowCol[0];
        let col = rowCol[1];
        revealCell(row, col);
    });
    cells.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        let idCell = e.target.id;
        let rowCol = idCell.split("-");
        let row = rowCol[0];
        let col = rowCol[1];
        if (!infoFieldMine[row][col].isRevealed) {
            displayCellTag(row, col);
        }
    });
}

function revealCell(row, col) {
  
    let cell = document.getElementById(row + '-' + col);
    if (!infoFieldMine[row][col].isRevealed && infoFieldMine[row][col].userTag == "") {
        infoFieldMine[row][col].isRevealed = true;
        if (!infoFieldMine[row][col].isMine) {
            setCellValue(cell, row, col);
        } else {
            revealMine(row, col);
            gameOver = true;
            disableCells();
            stopTimer();
            
        }
    }
    checkGameStatus();
}

function setCellValue(cell, row, col) {
    startTimer();
    cell.classList.add('uncovered');
    cell.classList.remove("covered");
    if (infoFieldMine[row][col].numberOfMinesAround != 0) {
        cell.textContent = infoFieldMine[row][col].numberOfMinesAround;
        cell.classList.add("x" + infoFieldMine[row][col].numberOfMinesAround);
    } else {
        revealNegighbors(row, col);
    }
}

function displayCellTag(row, col) {
    setCellTag(row, col);
    let cell = document.getElementById(row + '-' + col);
    if (infoFieldMine[row][col].userTag == "flag") {
        cell.textContent = EXCLAMASION_SYMBOL;
        bombCount--;
    } else if (infoFieldMine[row][col].userTag == "") {
        cell.textContent = "";
    } else {
        cell.textContent = QUESTION_SYMBOL;
        bombCount++;
    }

    displayUntaggedMineCount();
}

function setCellTag(row, col) {
    if (infoFieldMine[row][col].userTag == "flag") {
        infoFieldMine[row][col].userTag = "questionableSymbol";
    } else if (infoFieldMine[row][col].userTag == "") {
        infoFieldMine[row][col].userTag = "flag";
    } else {
        infoFieldMine[row][col].userTag = "";
    }

}

function revealMine(row, col) {
    let cell = document.getElementById(row + '-' + col);
    cell.classList.add("uncovered");
    cell.classList.remove("covered");
    cell.classList.add("mineExploted");
    cell.innerHTML = BOMB_ICON;
    revealAllBombs();
}

function revealAllBombs() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (infoFieldMine[i][j].isMine && infoFieldMine[i][j].userTag == '') {
                let cell = document.getElementById(i + '-' + j);
                cell.classList.add("uncovered");
                cell.classList.remove("covered");
                cell.classList.add("mineExploted");
                cell.innerHTML = BOMB_ICON;
            }
        }
    }
}


function disableCells() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cells = document.getElementById(i + '-' + j);
            cells.setAttribute("disabled", true);
            cells.classList.add("disabled");
        }

    }
}

function checkWin() {
    //let winGame = false;
    let countCellsRevealed = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (infoFieldMine[i][j].isRevealed) {
                countCellsRevealed++;
            }
        }

    }
    
    if (countCellsRevealed == (rows * cols) - totalMinesInBoard) {
        stopTimer();
        disableCells();
        return true;
    }
    return false;
}

function createTimer() {
    ++countSeconds;

    let hour = Math.floor(countSeconds / 3600);
    let minute = Math.floor((countSeconds - hour * 3600) / 60);
    let seconds = countSeconds - (hour * 3600 + minute * 60);

    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (seconds < 10) seconds = "0" + seconds;

    time.textContent = minute + ":" + seconds;
}

function startTimer() {
    if (interval == null) {
        interval = setInterval(createTimer, 1000);
    } else {
        return
    }
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    stopTimer();
    countSeconds = 0;
    time.textContent = "00:00";
}

function displayUntaggedMineCount() {
    return document.getElementById("mines-counter").textContent = bombCount;
}

function resetBoard() {
    while (document.getElementById("field-mines").firstChild) {
        document.getElementById("field-mines").removeChild(document.getElementById("field-mines").firstChild);
    }
}

function checkGameStatus() {
    if (gameOver) {
        statusFace.innerHTML = SAD_FACE;
        
    } else if (checkWin()) {
        statusFace.innerHTML = HAPPY_FACE;
    
    } else {
        statusFace.innerHTML = BORED_FACE;
      
    }
}

function resetGame() {
    gameOver = false;
    statusFace.innerHTML = BORED_FACE;
    resetTimer();
    bombCount = 0;
    initGame();
    console.log(infoFieldMine);
}

function eventClickButtonReset() {
    statusFace.addEventListener("click", () => {
        resetGame();
    });
}

