const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = '127.0.0.1:5500/minesweeper/src/index.html';

Given('a user opens the app', async () => {
	await page.goto(url);
});


async function getNumberRows() {
	const board = page.locator('data-testid=dashboard-minesweeper')
	let numOfRows = 0;
	while (i < board.length) {
		numOfRows ++;
	}
	console.log(numOfRows);
	return numOfRows;
	
}

async function getNumberColumns(numOf) {
	/*const board = await page.locator('data-testid=dashboard-minesweeper')
	let i = 0;
	while (i < board.length) {
		i++;
	}
	return i;*/
}

Given('the number of columns in the minefield should be: {string}', async function (string) {
	const board = page.locator('data-testid=dashboard-minesweeper')

	let numOfRows = getNumberRows();
	expect(numOfRows).toBe(string);
});

Given('the number of rows in the minefield should be: {string}', function (string) {
	// Write code here that turns the phrase above into concrete actions
	return 'pending';
});