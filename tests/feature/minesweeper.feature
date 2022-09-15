Feature: Minesweeper

    Background:
        Given a user opens the app

    Scenario: Default initial board
        Then the page show a board with "hidden" mines
        And the number of columns should be: "8"
        And the number of rows should be: "8"
        And the should be dificulty: "easy"

    Scenario: Default initial board score
        Then the user doesn't start to discover any mine
        And the counter of mines should be: "10"
        And the time counter should be: ""
        And the "buttonReset" status should be: "boredFaceImage"

    Scenario Outline: Start increase the time
        When the user press any cell located in the row "<row>"
        And column "<column>"
        Then the time counter start to increase "<timeCounter>"

        Examples:
            | row | column | timeCounter |
            | 5   | 1      | 0           |
            | 5   | 1      | 1           |
            | 5   | 1      | 5           |
            | 1   | 3      | 30          |

    Scenario: Reset the score board
        Given the counter mines show the following value: "<minesCounter>":
        And the counter time show the following value: "<timeCounter>"
        And the "<buttonReset>" show the following status: "<boredFaceImage>"
        
