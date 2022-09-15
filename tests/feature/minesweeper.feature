Feature: Minesweeper

Background:
Given a user opens the app

Scenario: Default initial page 
Then the page show a table with the following dificulty: "easy"
And the number of columns should be: "8"
And the number of rows should be: "8"
And the counter of mines should be: "10"
And the time counter should be: ""
And the button reset the status should be: "bored"

Scenario:    
