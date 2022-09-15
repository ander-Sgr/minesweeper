Feature: Minesweeper

    Background:
        Given a user opens the app

    Scenario: Default initial board
        Then the page show a board with the following dificulty: "easy"
        And the number of columns should be: "8"
        And the number of rows should be: "8"

    Scenario: Default initial board score
        Then the user doesn't start to discover any mine
        And the counter of mines should be: "10"
        And the time counter should be: ""
        And the button reset status should be: "boredFaceImage"

    Scenario Outline: Start the game
        When the user press any a cell located in the row "<row>"
        And column "<column>"
        Then the time counter start in "<timeCounter>"
        And the time counter start to increase "<timeCounter> + 1"

        Examples:
            | row | column | timeCounter |
            | 5   | 1      | 0           |
            | 5   | 1      | 1           |
            | 5   | 1      | 2           |
            | 1   | 3      | 3           |

    