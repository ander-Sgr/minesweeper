Feature: Minesweeper core
    '
    (numRow, numCol) represents the coordinates of a cell

    Represents a hidden cell: "#"
    Represents a cell with mine: "X"
    Represents a cell without a bomb: "o"
    Represents a tagged cell with a bomb: "*"
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

    For load the mockdata the user have to put in the URL as a param the
    TODO: Como cargar el mockData
    ??
    '

    Background:
        Given a user opens the app

    Scenario: End Game, Revealing a cell with a bomb
        Given the user loads the following mock data: "###-##x-###"
        When the user reveals the cell "(2, 3)"
        Then the cell "(2, 3)" should be a bomb
        And the game should be over

    Scenario Outline: Revealing a cell without a bomb -> should show the numbers of bombs adjacents
        Given the user loads the following mock data: "<mockData>"
        When the user reveals the cell "(2, 2)"
        Then the the cell "(2, 2)" should show the folling value: "<numberOfMines>"

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


    Scenario Outline: Revealing a cell and their neighbors without a bombs
        Given the user loads the following mock data: "<mockData>"
        When the user reveals the cell "(2, 2)"
        Then the board revelas the neighbors cell: "<cellsRevealed>" recursively

    Example:
            | mockData                      | cellsRevealed                 |
            | #####-#####-#####-#####-##### | ooo1x.ooo11-ooooo-111oo-2x1oo |


    Scenario Outline: End game, should show all the bombs in the board
        Given the user loads the following mock data: "<mockData>"
        When the user reveals the cell "1,3" with a mine
        Then the expected data in the board shoould be: "<expectedData>"

    Example:
            | mockData    | expectedValues |
            | ##x-###-### | oox-oox-xoo    |

    ##deberia de estar en core ?, habría que hacer para bomba suspected y bomba questionable ?
    Scenario: End game, revealing all the bombs with a tagged cell without a bomb
        Given the user loads the following mock data: "##!-###-###"
        When the user tagg the cell "(1, 3)" without a bomb
        And the user reveals the cell "(3, 3)" with a bomb
        Then the board should be: "oo*-ooo-xxx"


    Scenario: End game, revealing all the bombs with a tegged cell with a bomb
        Given the user loads the following mock data: "##!-###-###"
        When the user tagg the cell "(1, 3)" with a bomb
        And the user reveals the cell "(3, 3)" with a bomb
        Then the board should be: "oo!-ooo-xxx"


#Scenario Outline: End game, Tagging a cell with a bomb -> should show all the bombs in the board except the tagged cell
#    Given the user loads the following mockData: "<mockData>"
#    When the user tags the cell "1,3"
#    And the user revels the cell "3, 3" with a bomb
#    Then the expected data in the board should be: "<expecteData>"
##Then the cells with mine should show, except the cell tagged
#Example:
#        | mockData    | expectedData |
#        | ##!-###-### | oo!-ooo-xox  |

TODO: Falta indicar las minas mal tageadas cuando revienta una mina - Añadir nuevo escenario
