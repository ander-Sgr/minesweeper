let infoFieldMine = [];

export function drawMinefield(numRows, numCols) {
  let table = document.getElementById("field-mines");
  for (let i = 1; i <= numRows; i++) {
    let row = createRow(i, numCols);
    table.appendChild(row);
  }
  console.log(infoFieldMine);

}

function createRow(idRow, numCols) {
  let colTr = document.createElement("tr");
  let arrRows = [];
  for (let col = 1; col <= numCols; col++) {
    let cell = createCell(idRow, col)
    colTr.appendChild(cell);
    arrRows.push(cell);
  }
  infoFieldMine.push(arrRows);
  //  console.log(arrRows);
  return colTr;
}

function createCell(idRow, idCol) {
  let cell = document.createElement("td");
  let cellId = setCellId(idRow, idCol);
  cell.setAttribute("id", cellId);
  cell.classList.add("covered");
  cell.setAttribute("data-testid", idRow + '-' + idCol);
  return cell;
}

export function setCellId(i, j) {
  return i + '-' + j;
}
