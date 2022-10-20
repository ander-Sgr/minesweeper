const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = '127.0.0.1:5500/minesweeper/src/index.html';
const BOMB_ICON = '&#128163;'
const EXCLAMASION_SYMBOL = "!";
const QUESTION_SYMBOL = "?";


async function getDimensionFieldMines() {
	const dimesion = {
		rows: 0,
		cols: 0
	}
	const getRows = await page.locator('[data-testid=field-mines] tr');
	const countRows = await getRows.count();
	let countColumns;
	for (let i = 0; i < countRows; i++) {
		countColumns = await getRows.nth(i).locator('td').count();

	}
	dimesion.rows = countRows;
	dimesion.cols = countColumns

	return dimesion;
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

/*
Given('the user loads the following mock data:', async (mockData) => {
	await page.goto(url + "?mockData=" + mockData.replaceAll("\n", "-"));
});*/

Given('a user opens the app', async () => {
	await page.goto(url);
});


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

	for (let i = 1; i <= rows; i++) {
		for (let j = 1; j <= cols; j++) {
			const cell = await page.locator('data-testid=' + i + "-" + j);
			await expect(cell).toHaveAttribute('class', string);

		}

	}
});


Given('the user loads the following mock data:', async (docString) => {
	await page.goto(url + "?mockdata=" + replaceLineBreak(docString));
});

When('the user reveals the cell {string}', async (string) => {
	await page.click('data-testid=' + getCellId(string));
});



Then('the game should be over', async () => {
	// Write code here that turns the phrase above into concrete actions
	return 'pending';
});