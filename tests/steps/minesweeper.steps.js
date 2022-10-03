const { Given, When, Then, DataTable, RerunFormatter } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = '127.0.0.1:5500/minesweeper/src/index.html';

async function getNumCols() {
	const getRows = await page.locator('[data-testid=field-mines] tr');
	const count  = await getRows.count();
	let countColumns;
	for (let i = 0; i < count; i++) {
		countColumns = await getRows.nth(i).locator('td').count();
		
	}
	return countColumns;
}

async function getNumRows() {
	const getRows = await page.locator('[data-testid=field-mines] tr');
	const numRows = await getRows.count();
	return numRows;
}


Given('a user opens the app', async () => {
	await page.goto(url);
});


Given('the number of columns in the minefield should be: {int}', async (int) => {
	let numCols =  await getNumCols();
	expect(numCols).toBe(int);;
});

Given('the number of rows in the minefield should be: {int}', async (int) => {
	let numRows = await getNumRows();
	expect(numRows).toBe(int);
});










