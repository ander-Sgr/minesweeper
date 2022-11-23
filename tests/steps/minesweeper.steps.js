const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = '127.0.0.1:5500/minesweeper/src/index.html';
const BOMB_ICON = '&#128163;'
const EXCLAMASION_SYMBOL = "!";
const QUESTION_SYMBOL = "?";

async function cellClick(cellID) {
	await page.click(`[data-testid="${cellID}"]`, { force: true });
}

async function buttonRightClick(buttonId) {
	await page.locator(`[data-testid="${buttonId}"]`).click({ button: "right" });
}

async function getDimensionFieldMines() {
	const dimensions = {
		rows: 0,
		cols: 0
	}
	const getRows = await page.locator('[data-testid=field-mines] tr');
	const countRows = await getRows.count();
	let countColumns;
	for (let i = 0; i < countRows; i++) {
		countColumns = await getRows.nth(i).locator('td').count();

	}
	dimensions.rows = countRows;
	dimensions.cols = countColumns

	return dimensions;
}



function replaceLineBreak(mockdata) {
	return mockdata.replaceAll("\n", "-");
}

function getCellId(cellId) {
	let splitCellId = cellId.split('-');
	let row = parseInt(splitCellId[0]) - 1;
	let col = parseInt(splitCellId[1]) - 1;
	return row + '-' + col;
}

async function readBoard(dimensions) {
	let boardDisplay = "";
	for (let i = 0; i < dimensions.rows; i++) {
		for (let j = 0; j < dimensions.cols; j++) {
			let cellID = i + '-' + j;
			let cell = await page.locator('id=' + cellID);
			let cellClass = await cell.getAttribute("class");
			let cellText = await cell.innerText();

			if (cellClass.split(" ").includes("covered") && cellText != '!') {
				boardDisplay += '#'
			} else if (cellClass.split(" ").includes("mineExploted")) {
				//boardDisplay += (cellText == '💣' ? 'x' : cellText);
				if (cellText == '💣') {
					boardDisplay += 'x';
				} else {
					boardDisplay += cellText;
				}
			} else if (cellText == '!') {
				boardDisplay += '!';
			} else {
				//boardDisplay += (cellText == '' ? '.' : cellText);
				if (cellText == '') {
					boardDisplay += '.'
				} else {
					boardDisplay += cellText;
				}
			}
		}
		if (i != dimensions.rows - 1) {
			boardDisplay += '-';
		}


	}
	return boardDisplay;
}


Given('a user opens the app', async () => {
	await page.goto(url);
});

Given('the user loads the following mock data:', async (docString) => {
	await page.goto(url + "?mockdata=" + replaceLineBreak(docString));
});

When('the user reveals the cell {string}', async (string) => {
	await cellClick(getCellId(string));
});

Then('the game should be over', async () => {
	await page.locator('data-testid=msg-lose-game');
});

Given('the user loads the following mock data: {string}', async (string) => {
	await page.goto(url + "?mockdata=" + string);
});

Then('the the cell {string} should show the following value: {string}', async (cellID, numMine) => {
	let cell = await page.locator('data-testid=' + getCellId(cellID)).innerText();
	expect(cell).toBe(numMine);

});

Then('the cell {string} should be empty', async (cellID) => {
	let cell = await page.locator('data-testid=' + getCellId(cellID)).innerText();
	expect(cell).toBe("");
});

Then('the board should looks like:', async (docString) => {
	let dimensions = await getDimensionFieldMines();
	let board = await readBoard(dimensions);
	expect(board).toBe(replaceLineBreak(docString));
});

/*------------*/

Given('the number of columns in the minefield should be: {int}', async (int) => {
	let numCols = (await getDimensionFieldMines()).cols
	expect(numCols).toBe(int);
});

Given('the number of rows in the minefield should be: {int}', async (int) => {
	let numRows = (await getDimensionFieldMines()).rows
	expect(numRows).toBe(int);
});

Given('all the cells should be: {string};', async (string) => {
	let dimesions = await getDimensionFieldMines();
	let rows = dimesions.rows;
	let cols = dimesions.cols;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const cell = await page.locator('data-testid=' + i + "-" + j);
			await expect(cell).toHaveClass(string);
		}

	}
});
Given('the untagged mines counter should be the following value: {int}', async (int) => {
	let untaggedMineCounter = await page.locator('data-testid=mines-counter').innerText();
	expect(untaggedMineCounter).toBe(int.toString());
});


Given('the time counter should be the following value: {string}', async (string) => {
	let timeCounter = await page.locator('data-testid=time-counter').innerText();
	expect(timeCounter).toBe(string);
});


Given('the button status should be the following value : boredFace', async () => {
	let statusFace = await page.locator('data-testid=button-status').innerText();
	expect(statusFace).toBe("\u{1F610}");
});


When('the user tag the cell {string} as a suspected mine', async (string) => {
	let cell = await page.locator('data-testid=' + getCellId(string)).innerText();
	if (cell == '?') {
		await buttonRightClick(getCellId(string));
		await buttonRightClick(getCellId(string));
	} else if (cell == '') {
		await buttonRightClick(getCellId(string));
	}
});

Then('the cell {string} should show a exclamation symbol', async (string) => {
	let cell = await page.locator('data-testid=' + getCellId(string)).innerText();
	expect(cell).toBe(EXCLAMASION_SYMBOL);
});

When('the user tag the cell {string} as a questionable mine', async (string) => {
	let cell = await page.locator('data-testid=' + getCellId(string)).innerText();
	if (cell == '!') {
		await buttonRightClick(getCellId(string));
	} else if (cell == '') {
		await buttonRightClick(getCellId(string));
		await buttonRightClick(getCellId(string));
	}
});


Then('the cell {string} should be a question symbol', async (string) => {
	let cell = await page.locator('data-testid=' + getCellId(string)).innerText();
	expect(cell).toBe(QUESTION_SYMBOL);
});

Then('the untagged mine counter shoould be the following value: {int}', async (int) => {
	let untaggedMineCounter = await page.locator('data-testid=mines-counter').innerText();
	expect(untaggedMineCounter).toBe(int.toString());
});


When('the user untag the cell {string}', async (string) => {
	let cell = await page.locator('data-testid=' + getCellId(string)).innerText();
	if (cell == '?') {
		await buttonRightClick(getCellId(string));
	} else if (cell == '!') {
		await buttonRightClick(getCellId(string));
		await buttonRightClick(getCellId(string));
	}
});

When('ther user press left click on the cell {string}', async (string) => {
	await cellClick(getCellId(string));
});

Then('the cell {string} should be revealed', async (string) => {
	let cell = await page.locator('data-testid=' + getCellId(string));
	await expect(cell).toHaveClass("uncovered disabled");
});

Then('the button reset should be the following value: sadFace', async () => {
	let statusFace = await page.locator('data-testid=button-status').innerText();
	expect(statusFace).toBe("\u{1F615}");
});

Then('the button reset should be the following value: happyFace', async () => {
	let statusFace = await page.locator('data-testid=button-status').innerText();
	expect(statusFace).toBe("\u{1F601}");
});

When('the user resets the game', async () => {
	await page.locator('data-testid=button-status').click();

});

Then('the untagged mine counter should be: {int}', async (int) => {
	let untaggedMineCounter = await page.locator('data-testid=mines-counter').innerText();
	expect(untaggedMineCounter).toBe(int.toString());
});

Then('the time counter should be: {string}', async (string) => {
	let timeCounter = await page.locator('data-testid=time-counter').innerText();
	expect(timeCounter).toBe(string);
});

Then('all the cells should be: {string}', async (string) => {
	let dimesions = await getDimensionFieldMines();
	let rows = dimesions.rows;
	let cols = dimesions.cols;
	if (string == "enabled" || string == "untagged") {
		string = "covered";
	}
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const cell = await page.locator('data-testid=' + i + "-" + j).getAttribute("class");
			expect(cell.includes(string)).toBeTruthy();
		}

	}
});

