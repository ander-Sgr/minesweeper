const COLUMNS = 8;
const ROWS = 8;


let untagedMineCounter = 10;
let remainingUntaggedMineCounter = 0;


window.onload = () => {
    initGame();
}

function initGame() {
    let paramsURL = getURLParams('mockdata');

    if (paramsURL !== null) {
        let rows = paramsURL.length;
        let cols = paramsURL[0].length;
        console.log('rows', rows, 'cols', cols);
        drawMinefield(rows, cols);
    } else {
        drawMinefield(ROWS, COLUMNS);
        setDefaultUntagedMineCounter(untagedMineCounter);
    }
}

function setCellId(i, j) {
    return 'cell-' + i + '-' + j;
}

function getURLParams(mockdataParam) {
    const parameters = new URLSearchParams(window.location.search);
    if (parameters.has('mockdata')) {
        mockDataValue = parameters.get(mockdataParam).split(" ");
    } else {
        mockDataValue = null;
    }
    return mockDataValue;
}


function drawMinefield(numRows, numCols) {
    let table = document.getElementById("field-mines");
    // let row, cellId, td;
    for (let i = 1; i <= numRows; i++) {
        let row = document.createElement("tr");
        row.setAttribute("id", i);
        for (let j = 1; j <= numCols; j++) {
            let cell = document.createElement("td");
            let cellId = setCellId(i, j);
            cell.setAttribute("id", cellId);
            cell.setAttribute("data-testid", cellId);
            row.appendChild(cell);
        }
        table.appendChild(row);

    }
}

function setDefaultUntagedMineCounter(untagedMineCounter) {
    let flags = document.getElementById("mines-counter");
    flags.textContent += untagedMineCounter;
}

function getDefaultUntagedMineCounter() {
    return untagedMineCounter;
}




