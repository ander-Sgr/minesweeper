Feature: Minesweeper

    '
    (numRow, numCol) represents the coordinates of a cell

    Represents a hidden cell: "#"
    Represents a cell with mine: "X"
    Represents a cell without a bomb: "o"
    Represents a suspected mine: "!"
    Represents a questionable mine: "?"
    Represents a row "-" ###-#x#-###

    "1" means a cell with 1 adjacent bomb
    "2" means a cell with 2 adjancets boombs
    "3" means a cell with 3 adjancets boombs
    "4" means a cell with 4 adjancets boombs
    "5" means a cell with 5 adjancets boombs
    "6" means a cell with 6 adjancets boombs
    "7" means a cell with 7 adjancets boombs
    "8" means a cell with 8 adjancets boombs

    For load the mockdata the user have to put in the URL as a param the following data presents
    in the Scenarios
    Ex: http://127.0.0.1:5500/minesweeper/src/index.html&mockData=###-###-###
    '
    Background:
        Given a user opens the app

    Scenario: Default initial board
        And the number of columns in the minefield should be: "8"
        And the number of rows in the minefield should be: "8"

    Scenario: Default mines in the dashboard
        And the number of mines in the dashboard shoould be the following value: "10"

    Scenario: Default untagged mines counter
        And the untagged mines counter should be the following value: "10"

    Scenario: Default time counter
        And the time counter should be the following value: "0"

    Scenario: Default button reset -> the button should show a icon depending of the state at the game
        And the button status should be the following value : "boredFace"

    Scenario: Tagging a cell with a suspected mine
        When the user tag the cell "2, 3" as a suspected mine
        Then the cell "2, 3" should show the following value: "!"

    Scenario: Untagging a cell with a suspected mine
        When the user untag the cell "2, 3" as a mine
        Then the cell "2, 3" should show the following value: ""

    Scenario: Tagging a cell with a questionable mine
        When the user tag the cell "2, 3" as a questionable mine
        Then the cell "2, 3" should show the following value: "?"

    Scenario: Untagging a cell with a questionable mine
        When the user untag the cell "2, 3" as a questionable mine
        Then the cell "2, 3" should show the following value: ""

    Scenario: Untagged mines counter -> the counter should started decrease
        When the user tag the cell "2, 3"
        Then the untagged mine counter shoould be the following value: "9"

    Scenario: Untagged mines counter -> the counter should started increase
        When the user tag the cell "2, 3"
        Then the untagged mine counter shoould be the following value: "10"

    Scenario: Negative utagged mine counter
        Given the user loads the following mockData: "!!!!!-!!!!!-#####"
        When the user tags the cell "(3,1)"
        And the user tags the cell "(3,2)"
        And the user tags the cell "(3,3)"
        And the user tags the cell "(3,4)"
        And the user tags the cell "(3,5)"
        Then the untagged mine counter should show the following value: "-5"

    Scenario: Tagging a cell with a questionable bomb -> the untagged mines counter don't do nothing
        When the user tag the cell "(2, 3)"
        Then the untagged mine counter shoould be the following value: "10"

    Scenario: Untagging a cell with a suspected bomb -> the untagged mines counter don't do nothing
        When the user tag the cell "(2,3)"
        Then the untagged mine counter shoould be the following value: "10"

    Scenario: using the mouse click  -> Revealing a cell 
        When ther user press left click on the cell "(2,3)"
        Then the cell "(2,3)" should be revealed

    Scenario: Using the mouse click -> Tagging a cell as a suspected mine
        When the user press "<click>" click on the cell "(2,3)"
        Then the cell "(2,3)" should be tagged

    Scenario: Using the mouse click Untaggin a cell as a suspected mine
        When the user press right click on the cell "(2,3)"
        And the user press right click another one on the cell "(2, 3)"
        And the user press right click another one on the cell "(2, 3)"
        Then the cell "(2,3)" should be untagged

    Scenario: Using the mouse click -> Tagging a cell as a questionable mine
        When the user press right click on the cell "(2,3)"
        And the user press right click another one on the cell "(2, 3)"
        Then the cell "(2,3)" should be tagged

    Scenario: Using the mouse click -> Untaggin a cell as a questionable mine
        When the user press right click on the cell "(2,3)"
        And the user press right click another one on the cell "(2, 3)"
        And the user press right click another one on the cell "(2, 3)"
        Then the cell "(2,3)" should be untagged

    Scenario: End game -> the button reset should show the status sadFace
        Given the user loads the following mock data: "###-##x-###"
        When the user reveals the cell "(2,3)" with a mine
        Then the button reset should be the following value: "sadFace"

    Scenario: Win game -> the button reset shouLd show the status happyFace
        Given the user loads the following mock data: "###-##x-###"
        When the user reveals the cell "(2,3)"
        Then the button reset should be the following value: "sadFace"

    @manual
    Scenario: Time counter, the time counter should increase when the user starts to reveals a cell without a bomb
        Given the user loads the following mock data: "###-##o-###"
        When the user reveals the cell "(2,3)"
        Then the time counter start to increase in seconds

    #deberia de ser manual ?
    @manual
    Scenario: Time counter, the time counter should be stop when the user reveals a cell with bomb
        Given the user loads the following mock data: "###-##x-###"
        When the user reveals the cell "(2,3)"
        Then the time counter should be stop

    Scenario: Restart the game
        Given the user loads the following mock data: "o11-o1x-o11"
        When the user press the "resetButton" reset button
        Then the board should show the following value: "###-###-###"

    Scenario: Enabling all the cells on the board
        Given the user laods the following mock data: "o11-o1x-o11"
        When the user press the "resetButton" reset button
        Then the cell "(1,1)" shoould be disabled
        And the cell "(1,2)" shoould be disabled
        And the cell "(1,3)" shoould be disabled
        And the cell "(2,1)" shoould be disabled
        And the cell "(2,2)" shoould be disabled
        And the cell "(2,3)" shoould be disabled
        And the cell "(3,1)" shoould be disabled
        And the cell "(3,2)" shoould be disabled
        And the cell "(3,3)" shoould be disabled

    Scenario: Disabling all the cells on the board by game over
        Given the user loads the following mock data: "###-##x-###"
        When the user reveals the cell "(2,3)" with a mine
        Then the cell "(1,1)" shoould be disabled
        And the cell "(1,2)" shoould be disabled
        And the cell "(1,3)" shoould be disabled
        And the cell "(2,1)" shoould be disabled
        And the cell "(2,2)" shoould be disabled
        And the cell "(2,3)" shoould be disabled
        And the cell "(3,1)" shoould be disabled
        And the cell "(3,2)" shoould be disabled
        And the cell "(3,3)" shoould be disabled