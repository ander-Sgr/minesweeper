import { drawMinefield, setCellId } from "./createBoard.js";
import { getURLParams, getMinePosition} from "./parametersHelper.js";

const COLUMNS = 8;
const ROWS = 8;
const BOMB_ICON = '&#128163;'
const EXCLAMASION_SYMBOL = "!";
const INTERROGATE_SYMBOL = "?";

const untagedMineCounter = 10;
let remainingUntaggedMineCounter = 0;
let winGame = false;
let endGame = false;
let flagEnabled = false;
export let minesLocation = [];

initGame();
addEventClick();

function initGame() {
    let paramsURL = getURLParams('mockdata');

    if (paramsURL !== null) {
        let rows = paramsURL.length;
        let cols = paramsURL[0].length;
        drawMinefield(rows, cols);
        getMinePosition(paramsURL, minesLocation);

        
    } else {
        setMines(untagedMineCounter, ROWS, COLUMNS);
        drawMinefield(ROWS, COLUMNS);
        setDefaultUntagedMineCounter(untagedMineCounter);
    }
}




function setMines(mineCounter, numRows, numCols) {
    let remainingUntaggedMineCounter = mineCounter;
    let counter = 0;
    while (remainingUntaggedMineCounter > 0) {
        let row = Math.floor(Math.random() * numRows) + 1;
        let col = Math.floor(Math.random() * numCols) + 1;
        let cellId = setCellId(row, col);
        
        if (!minesLocation.includes(cellId)) {
            minesLocation.push(cellId);
            remainingUntaggedMineCounter -= 1;
            counter++;
        }        
    }
    console.log(counter);
}


function checkMines(cellId) {
    if (minesLocation.includes(cellId)) {
        let cells = document.getElementById(cellId);
        cells.classList.add("mine");
        setIconBomb(cellId);
        console.log('mine');
    }
}

function setIconBomb(cellId) {
    document.getElementById(cellId).innerHTML = BOMB_ICON;
}

function addEventClick() {
    let cells = document.getElementsByTagName("td");
    for (const elements of cells) {
        elements.addEventListener('click', () => {
            uncoverCell(elements.getAttribute("id"));
        });
        elements.addEventListener('click', () => {
            checkMines(elements.getAttribute("id"));
        });
    }

}

function uncoverCell(cellId) {
    let cell = document.getElementById(cellId);
    cell.classList.add("uncovered");
    cell.classList.remove("covered");
}

function setDefaultUntagedMineCounter(untagedMineCounter) {
    let flags = document.getElementById("mines-counter");
    flags.innerText = untagedMineCounter;
}

function getDefaultUntagedMineCounter() {
    return untagedMineCounter;
}

function showMockadaAreaInput() {
    document.getElementById();
}