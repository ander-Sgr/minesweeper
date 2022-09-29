

window.onload = () => {
    drawBoard(8, 8);

}

function getCellId(i, j) {
    return 'cell-' + i + '-' + j;
}

function drawBoard(numRows, numCols) {
    let table = document.getElementById("dashboard-minesweeper");
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
