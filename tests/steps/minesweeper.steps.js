const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = '127.0.0.1:5500/minesweeper/src/index.html';

async function cellClick(cellId) {
	await page.click(`[data-testid="${cellId}"]`, { force: true });
}

async function getLengthTable() {
	const table = await page.locator('data-testid=dashboard-minesweeper');
	
}


Given('a user opens the app', async () => {
	await page.goto(url);
}

/*
Given('the number of columns in the minefield should be: {string}', async (string) => {
	// Write code here that turns the phrase above into concrete actions
	return 'pending';
});

Given('the number of rows in the minefield should be: {string}', async (string) => {
	// Write code here that turns the phrase above into concrete actions
	return 'pending';
});
*/