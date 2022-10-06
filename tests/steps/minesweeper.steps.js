const { Given, When, Then, DataTable, RerunFormatter } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = '127.0.0.1:5500/minesweeper/src/index.html';

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

Given('all the cells should be: {string};', async  (string) => {
	let dimesions =  await getDimensionFieldMines();
	let rows = dimesions.rows;
	let cols = dimesions.cols;

	for (let i = 1; i <= rows; i++) {
		for (let j = 1; j <= cols; j++) {
			const cell = await page.locator('data-testid='+i+"-"+j);
			console.log(cell);
			await expect(cell).toHaveAttribute('class', string);
		
		}
		
	}
});


Given('the user loads the following mock data:', async (docString) => {
	await page.goto(url + "?mockdata=" + docString);
});

Given('the untagged mines counter should be the following value: {int}', async (int) => {
	let untagedMineCounter = await page.locator("data-testid=mines-counter").textContent();
	expect(parseFloat(untagedMineCounter)).toBe(int);

});

Given('the number of mines in the dashboard shoould be the following value: {int}', async (int) => {
	const minefield = await page.locator('[data-testid=field-mines] tr');
});

/*
When('the user reveals the cell {string}', function (string) {
	// Write code here that turns the phrase above into concrete actions
	return 'pending';
});


Then('the cell {string} should be a mine', function (string) {
	// Write code here that turns the phrase above into concrete actions
	return 'pending';
});

And('the game should be over', function () {
	// Write code here that turns the phrase above into concrete actions
	return 'pending';
});*/