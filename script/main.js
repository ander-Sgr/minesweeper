
const COLUMNS = 8;
const ROWS = 8;

window.onload = () => {
    drawMinefield(ROWS, COLUMNS);
}

function getCellId(i, j) {
    return 'cell-' + i + '-' + j;
}

function drawMinefield(numRows, numCols) {
    let table = document.getElementById("field-mines");
    // let row, cellId, td;
    for (let i = 1; i <= numRows; i++) {
        let row = document.createElement("tr");
        row.setAttribute("id", i);
        for (let j = 1; j <= numCols; j++) {
            let td = document.createElement("td");
            let cellId = getCellId(i, j);
            td.setAttribute("id", cellId);
            row.appendChild(td);
        }
        table.appendChild(row);

    }
}
