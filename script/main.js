const ROW = 8;
const COL = 8;
let board = [];

window.onload = function(){
    drawBoard();
}

function drawBoard() {
    for (let r = 0; r < ROW; r++) {
        let row = []
        for (let c = 0; c < COL; c++) {
            //get cell position [1-2]
            let cell = document.createElement("div")
            cell.id = r.toString() + "-" + c.toString()
            //cell.addEventListener("click, clickCell()")
            document.getElementById("board").append(cell)
            row.push(cell)
        }
        board.push(row)
    }
}
