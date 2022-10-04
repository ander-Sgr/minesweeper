Feature: Minesweeper core
'
(numRow, numCol) represents the coordinates of a cell

Board data:
Represents a cell with mine: "x"
Represents a cell without a mine: "o"

Board info:
Represents a hidden cell: "#"
Represents a cell with mine: "X"
Represents a tagged cell with a mine: "*"
Represents a suspected mine: "!"
Represents a questionable mine: "?"
Represents a row "-" ###-#x#-###
Represent an empty cell: "."

"1" means a cell with 1 adjacent bomb
"2" means a cell with 2 adjancets boombs
"3" means a cell with 3 adjancets boombs
"4" means a cell with 4 adjancets boombs
"5" means a cell with 5 adjancets boombs
"6" means a cell with 6 adjancets boombs
"7" means a cell with 7 adjancets boombs
"8" means a cell with 8 adjancets boombs

For load the mockdata the user have to put in the URL as a param the following data presents
in the Scenarios,
For example the user loads "ooo-xox-ooo" its represents 3 rows with 3 columns

Ex: http://127.0.0.1:5500/minesweeper/src/index.html&mockData=###-###-###
'

Background:
    Given a user opens the app

Scenario: Revealing a cell with a mine, end game
    Given the user loads the following mock data:
        """
        ooo  
        oox 
        ooo
        """
    When the user reveals the cell "(2, 3)"
    Then the cell "(2, 3)" should be a mine
    And the game should be over

#
#Scenario Outline: Revealing a cell without a mine -> should show the numbers of mines adjacents
#    Given the user loads the following mock data: "<mockData>"
#    When the user reveals the cell "(2, 2)"
#    Then the the cell "(2, 2)" should show the following value: "<numberOfMines>"
#
#    Examples:
#        | mockData    | numberOfMines |
#        | oxo-ooo-ooo | 1             |
#        | oxo-ooo-xoo | 2             |
#        | oxx-oox-ooo | 3             |
#        | xxo-ooo-xox | 4             |
#        | ooo-xox-xxx | 5             |
#        | xox-xoo-xxx | 6             |
#        | xxx-oox-xxx | 7             |
#        | xxx-xox-xxx | 8             |
#
#Scenario: Revealing a cell without mine and without surrounding mines, the cell will be an empty cell
#    Given the user loads the following mock data:
#        """
#        ooo
#        ooo
#        ooo
#        ***
#        """
#    When the user reveals the cell "(2,2)"
#    Then the cell "(2,2)" should be empty 
#    #2-2
#
#
#Scenario: Revealing an empty cell -> should reveals their neighbors
#    Given the user loads the following mock data:
#        """
#        ooo
#        ooo
#        ooo
#        ***
#        """
#    When the user reveals the cell "(2, 2)"
#    Then the board should looks like:
#        """
#        ...
#        ...
#        ...        
#        ###
#        """
#
#
#Scenario: An empty cell revealed by a neightbour, the adjacents cells will be revealed
#    Given the user loads the following mock data:
#        """
#        ooxoo
#        ooooo
#        ooooo
#        """
#    When the user reveals the cell "(3,1)"
#    Then the board should looks like:
#        """
#        o1#1o
#        o111o
#        ooooo
#        """
#
#
#Scenario: End game -> should show all the mines in the board
#    Given the user loads the following mock data:
#        """
#        oox
#        oox
#        xoo
#        """
#    When the user reveals the cell "1,3" with a mine
#    Then the board shoould be:
#        """
#        ..x
#        ..x
#        x..
#        """
#
#
###deberia de estar en core ?, habría que hacer para bomba suspected y bomba questionable ?
#Scenario: End game -> revealing all the mines with a tagged cell without a mines  //como está tageada?
#    Given the user loads the following mock data:
#        """
#        ooo
#        ooo
#        xxx
#        """
#    When the user tagg the cell "(1, 3)"
#    And the user reveals the cell "(3, 3)"
#    Then the board should be:
#        """
#        ..*
#        ...
#        xxx
#        """
#
#
#Scenario: End game -> revealing all the mines with a tagged cell with a mines
#    Given the user loads the following mock data:
#        """
#        oox
#        ooo
#        xxx
#        """
#    When the user tagg the cell "(1, 3)" with a mines // as mined
#    And the user reveals the cell "(3, 3)" with a mines
#    Then the board should be:
#        """
#        ..!
#        ...
#        xxx
#        """
#