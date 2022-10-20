const cellComponents = {
    row: 0,
    col: 0,
    isMine: false,
    isRevealed: false,
    userTag: "",
    isWrongTagged: false,
    numberOfMinesAround: 0
}


const BOMB_ICON = '&#128163;'
const EXCLAMASION_SYMBOL = "!";
const QUESTION_SYMBOL = "?";



let cols = 8;
let rows = 8;
let untagedMineCounter = 10;
let bombCount = 0;
let remainingUntaggedMineCounter = 0;
let timer = false;
let seconds = 0;
let gameOver = false;
let statusFace = "";
let mockdata = getMockDataParam('mockdata');
let infoFieldMine = createBoard(untagedMineCounter, cols, rows);


window.onload = () => {
    initGame();
}

function initGame() {
    if (!window.location.search.includes("?")) {
        createBoardDOM(rows, cols);
        setNumAdjacentsMines(infoFieldMine);
        console.log(infoFieldMine);
    } else {
        infoFieldMine = createMockDataBoard(mockdata);
        rows = infoFieldMine.length;
        cols = infoFieldMine[0].length;
        createBoardDOM(rows, cols);
        setNumAdjacentsMines(infoFieldMine);

        console.log(mockdata);
        console.log(infoFieldMine)
    }
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
        }
    }
    return board;
}


function createBoardDOM(numRows, numCols) {
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
        const position = {
            cellRow: row,
            cellCol: col
        }
        if (!board[position.cellRow][position.cellCol].isMine) {
            board[position.cellRow][position.cellCol].isMine = true;
            remainingUntaggedMineCounter -= 1;
            bombCount++;
            untagedMineCounter = bombCount;
        }
    }
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
            tagCell(row, col);
            setCellTag(row, col)
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
        }
    }
}

function setCellValue(cell, row, col) {
    console.log(cell);
    cell.classList.add('uncovered');
    cell.classList.remove("covered");
    if (infoFieldMine[row][col].numberOfMinesAround != 0) {
        cell.textContent = infoFieldMine[row][col].numberOfMinesAround;
        cell.classList.add("x" + infoFieldMine[row][col].numberOfMinesAround);
    } else {
        revealNegighbors(row, col);
    }
}

function setCellTag(row, col) {
    let cell = document.getElementById(row + '-' + col);
    if (infoFieldMine[row][col].userTag == "flag") {
        cell.textContent = EXCLAMASION_SYMBOL;
    } else if (infoFieldMine[row][col].userTag == "") {
        cell.textContent = "";
    } else {
        cell.textContent = QUESTION_SYMBOL;
    }
}

function disableCells(row, col) {
    let cell = document.getElementById(row + '-' + col);
    if (infoFieldMine[row][col].isRevealed == true && infoFieldMine[row][col].isMine == true) {
        cell.setAttribute("disabled", true);
    }
}

function tagCell(row, col) {
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
            if (infoFieldMine[i][j].isMine) {
                let cell = document.getElementById(i + '-' + j);
                cell.classList.add("uncovered");
                cell.classList.remove("covered");
                cell.classList.add("mineExploted");
                cell.innerHTML = BOMB_ICON;
            }
            disableCells(i, j);
        }
    }
}

function endGame() {
    
}
