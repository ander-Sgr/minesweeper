Feature: Minesweeper core
    '
    (numRow, numCol) represents the coordinates of a cell

    Represents a hidden cell: "#"
    Represents a cell with mine: "X"
    Represents a cell without a mine: "o"
    Represents a tagged cell with a mine: "*"
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

    Scenario: Revealing a cell
        When the user reveals the cell "(2,3)"
        Then the cell shoould be revealed
    
     Scenario Outline: Revealing a cell without a mine -> should show the numbers of mines adjacents
        Given the user loads the following mock data: "<mockData>"
        When the user reveals the cell "(2, 2)"
        Then the the cell "(2, 2)" should show the following value: "<numberOfMines>"

        Examples:
            | mockData    | numberOfMines |
            | #x#-###-### | 1             |
            | #x#-###-x## | 2             |
            | #xx-##x-### | 3             |
            | xx#-###-x#x | 4             |
            | ###-x#x-xxx | 5             |
            | x#x-x##-xxx | 6             |
            | xxx-##x-xxx | 7             |
            | xxx-x#x-xxx | 8             |

    Scenario: Revealing a empty cell
        Given the user loads the following mock data: "###-#x#-###"
        When the user reveals the cell "(2,2)"
        Then the cell should show the following value: "0"

    Scenario Outline: Revealing a cell with 0 mines adjacents -> should reveals their neighbors
        Given the user loads the following mock data: "#####-#####-#####-#####-#####"
        When the user reveals the cell "(2, 2)"
        Then the board reveals the neighbors cell: "ooo1x-ooo11-ooooo-111oo-2x1oo"

    Scenario: End Game -> Revealing a cell with a mine
        Given the user loads the following mock data: "###-##x-###"
        When the user reveals the cell "(2, 3)"
        Then the cell "(2, 3)" should be a mine
        And the game should be over
    #deberia de hacer un scenario donde explique que ha de salir cuando acabe el juego ?

    Scenario Outline: End game -> should show all the mines in the board
        Given the user loads the following mock data: "##x-###-###"
        When the user reveals the cell "1,3" with a mine
        Then the board shoould be: "oox-oox-xoo"

    ##deberia de estar en core ?, habría que hacer para bomba suspected y bomba questionable ?
    Scenario: End game -> revealing all the mines with a tagged cell without a mines
        Given the user loads the following mock data: "##!-###-###"
        When the user tagg the cell "(1, 3)" without a mines
        And the user reveals the cell "(3, 3)" with a mines
        Then the board should be: "oo*-ooo-xxx"


    Scenario: End game -> revealing all the mines with a tegged cell with a mines
        Given the user loads the following mock data: "##!-###-###"
        When the user tagg the cell "(1, 3)" with a mines
        And the user reveals the cell "(3, 3)" with a mines
        Then the board should be: "oo!-ooo-xxx"

    #Scenario cuando el juego esta en over-game

    #el win game ha de estar en core ?
    Scenario: Win the game -> all the cells with mines have been tagged correctly
        Given the user loads the following mock data: "!oo-!o!-ooo"
        And  the untagged mines counter show the following value: "0"
        Then the user wins the game

    Scenario: Win the game -> all the cells without mines have been revealed
        Given the user loads the following mock data: "#oo-#o#-ooo"
        Then the user wins the game

    Scenario: Win the game -> reveals all mines wihtout use the untagged counter mines
        Given the 
#TODO: Falta indicar las minas mal tageadas cuando revienta una mina - Añadir nuevo escenario
