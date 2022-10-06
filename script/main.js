import { drawMinefield } from "./createBoard.js";

const COLUMNS = 8;
const ROWS = 8;
const EXCLAMASION_SYMBOL = "!";
const INTERROGATE_SYMBOL = "?";

let untagedMineCounter = 10;
let remainingUntaggedMineCounter = 0;
let winGame = false;
let endGame = false;
let flagEnabled = false;
let minesLocation = [];

initGame();

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

function getCellId(i, j) {
    let cellId = 'cell-' + i + '-' + j;
    let domCellId = document.getElementById(cellId);

    return domCellId;
}


function uncoverCell(cellId) {
    let cell = document.getElementById(cellId);
    cell.classList.add("uncovered");
}

function setDefaultUntagedMineCounter(untagedMineCounter) {
    let flags = document.getElementById("mines-counter");
    flags.innerText = untagedMineCounter;
}

function getDefaultUntagedMineCounter() {
    return untagedMineCounter;
}

function getURLParams(mockdataParam) {
    const parameters = new URLSearchParams(window.location.search);
    let  mockDataValue = parameters.get(mockdataParam);
    if (parameters.has('mockdata')) {
        for (let i = 0; i < mockDataValue.length; i++) {
            if (mockDataValue[i].includes("-")) {
                mockDataValue = mockDataValue.split("-");
            } else if (mockDataValue[i].includes(" ")) {
                mockDataValue = mockDataValue.split(" ");
            }
        }
    } else {
        mockDataValue = null;
    }
    return mockDataValue;
}
