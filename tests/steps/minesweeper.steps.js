const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = '127.0.0.1:5500/minesweeper/src/index.html';

Given('a user opens the app', async () => {
	await page.goto(url);
});

