Feature: Minesweeper

    '
    (numRow, numCol) represnets the coordinates of a cell

    Represents a hidden cell: "#"
    Represents a cell with mine: "X"
    Represents a suspected mine: "!"
    Represents a questionable mine: "?"
    Represents a row "-" ###-#x#-###
    
    1 means a cell with 1 adjacent bomb
    2 means a cell with 2 adjancets boombs
    3 means a cell with 3 adjancets boombs
    4 means a cell with 4 adjancets boombs
    5 means a cell with 5 adjancets boombs
    6 means a cell with 6 adjancets boombs
    7 means a cell with 7 adjancets boombs
    8 means a cell with 8 adjancets boombs
    '
    Background:
        Given a user opens the app

    Scenario: Default initial board
        Then the page show a board
        And the number of columns should be: "8"
        And the number of rows should be: "8"

    Scenario: Reveals a cell with a bomb -> End Game
        Given the user loads the following mock data: "#X"
        When the user reveals the cell "2, 3"
        Then the cell "2, 3" shoould be a bomb
        And the gema shoould be over

    Scenario: Tag a cell with a suspected bomb
        When the user tag the cell "2, 3" as a suspected mine
        Then the cell "2, 3" should show the following value: "!"

    Scenario: Untag a cell with a suspected bomb
        When the user untag the cell "2, 3" as a mine
        Then the cell "2, 3" should show the following value: ""

    Scenario: Tag a cell with a questionable mine
        When the user tag the cell "2, 3" as a questionable mine
        Then the cell "2, 3" should show the following value: "?"

    Scenario: Untag a cell with a questionable mine
        When the user untag the cell "2, 3" as a questionable mine
        Then the cell "2, 3" should show the following value: ""

    Scenario: Reveals a cell within a bomb -> should show the numbers of bombs adjacents
        Given the user loads the following mock data: "<mockData>"
        When the user reveals the "<row>" row, col "<col>"
        Then the the cell located in "<row>" row , col "<col>" should show the folling value: "<numberOfMines>"
        
        Example: 

    


#Scenario: Default initial board score
#    Then the user doesn't start to discover any mine
#    And the counter of mines should be: "10"
#    And the time counter should be: ""
#        And the "buttonReset" status should be: "boredFaceImage"
#
#Scenario Outline: Start increase the time
#    When the user press any cell located in the row "<row>"
#    And column "<column>"
#    Then the time counter start to increase "<timeCounter>"
#
#    Examples:
#        | row | column | timeCounter |
#        | 5   | 1      | 0           |
#        | 5   | 1      | 1           |
#         | 5   | 1      | 5           |
#        | 1   | 3      | 30          |

#Scenario: Reset the score board
#    Given the counter mines show the following value: "<minesCounter>":
#    And the counter time show the following value: "<timeCounter>"
#    And the "<buttonReset>" show the following status: "<boredFaceImage>"

