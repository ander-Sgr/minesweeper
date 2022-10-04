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
   in the Scenarios,
   For example the user loads "ooo-xox-ooo" its represents 3 rows with 3 columns
   Ex: http://127.0.0.1:5500/minesweeper/src/index.html&mockData=###-###-###
   '
   Background:
      Given a user opens the app

   Scenario: Default initial board
      And the number of columns in the minefield should be: 8
      And the number of rows in the minefield should be: 8

   Scenario: Default untagged mines counter
      And the untagged mines counter should be the following value: 10

#Scenario: Default mines in the dashboard
#  And the number of mines in the dashboard shoould be the following value: 10
#
# Scenario: Default time counter
#     And the time counter should be the following value: "0"
#
# Scenario: Default button reset -> the button should show a icon depending of the state at the game
#     And the button status should be the following value : "boredFace"
#
# Scenario: Tagging a cell with a suspected mine
#     When the user tag the cell "2, 3" as a suspected mine
#     Then the cell "2, 3" should show a exclamation symbol
#
# Scenario: Untagging a cell with a suspected mine
#     When the user untag the cell "2, 3" as a suspected mine
#     Then the cell "2, 3" should be empty
#
# Scenario: Tagging a cell with a questionable mine
#     When the user tag the cell "2, 3" as a questionable mine
#     Then the cell "2, 3" should show a question symbol
#
# Scenario: Untagging a cell with a questionable mine
#     When the user untag the cell "2, 3" as a questionable mine
#     Then the cell "2, 3" should be empty
#
# Scenario: Untagged mines counter -> the counter should start to decrease
#     When the untagged mines its in 10
#     And the user tag the cell "2, 3" as a suspected mine
#     Then the untagged mine counter shoould be the following value: 9
#
# Scenario: Untagged mines counter -> the counter should start to increase
#     Given the user loads the following mock data: "ooo-oo!-ooo"
#     And the untagged mines counter its in: 9
#     When the user untag the cell "2, 3"
#     Then the untagged mine counter shoould be the following value: 10
#
# Scenario: The untagged mine counter is in 0 -> the user follows putting more flags and the untagged mine counter should  negative
#     Given the user loads the following mockData: "oooox-ooxoo-xoooo"
#     When the user tags the cell "(3,1)"
#     And the user tags the cell "(3,2)"
#     And the user tags the cell "(3,3)"
#     And the user tags the cell "(3,4)"
#     And the user tags the cell "(3,5)"
#     Then the untagged mine counter should show the following value: -5
#
# Scenario: Tagging a cell with a questionable mine -> the untagged mines counter don't do nothing
#     Given the user loads the following mock data: "ooo-oxo-ooo"
#     And the untagged mine counter its in: 10
#     When the user tag the cell "(2, 3)" as a questionable mine
#     Then the untagged mine counter shoould be the following value: 10
#
# Scenario: Untagging a cell with a suspected mine -> the untagged mines counter don't do nothing
#     Given the user loads the following mock data: "ooo-oxo-ooo"
#     And the untagged mine counter its in: 10
#     When the user untag the cell "(2,3)" as a suspected mine
#     Then the untagged mine counter shoould be the following value: "10"
#
# Scenario: using the mouse click -> Revealing a cell
#     When ther user press left click on the cell "(2,3)"
#     Then the cell "(2,3)" should be revealed
#
# Scenario: Using the mouse click -> Tagging a cell as a suspected mine
#     When the user press "<click>" click on the cell "(2,3)"
#     Then the cell "(2,3)" should be tagged as suspected
#
# Scenario: Using the mouse click -> Untaggin a cell as a suspected mine
#     Given the cell "(2,3)" tagged as a suspected mine
#     When the user press right click on the cell "(2,3)"
#     And the user press right click another one on the cell "(2, 3)"
#     Then the cell "(2,3)" should be untagged as a suspected mine
#
# Scenario: Using the mouse click -> Tagging a cell as a questionable mine
#     Given the cell "(2,3)" tagged as a suspected mine
#     When the user press right click on the cell "(2,3)"
#     Then the cell "(2,3)" should be tagged as a questionable mine
#
# Scenario: Using the mouse click -> Untaggin a cell as a questionable mine
#     Given the cell "(2,3)" tagged as a questionable mine
#     When the user press right click on the cell "(2,3)"
#     Then the cell "(2,3)" should be untagged as a questionable mine
#
# Scenario: End game -> the button reset should show the status sadFace
#     Given the user loads the following mock data: "ooo-oox-ooo"
#     When the user reveals the cell "(2,3)" with a mine
#     Then the button reset should be the following value: "sadFace"
#
# Scenario: Win game -> the button reset shouLd show the status happyFace
#     Given the user loads the following mock data: "ooo-oox-ooo"
#     When the user reveals the cell "(2,3)"
#     Then the button reset should be the following value: "happyFace"
#
# @manual
# Scenario: Time counter, the time counter should increase when the user starts to reveals a cell without a bomb
#     Given the user loads the following mock data: "###-##o-###"
#     When the user reveals the cell "(2,3)"
#     Then the time counter start to increase in seconds
#
# #deberia de ser manual ?
# @manual
# Scenario: Time counter, the time counter should be stop when the user reveals a cell with bomb
#     Given the user loads the following mock data: "ooo-oox-ooo"
#     When the user reveals the cell "(2,3)"
#     Then the time counter should be stop
#
# Scenario: Restart the game
#     Given the user loads the following mock data: "ooo-oxo-oxo"
#     And the user reveals the cell "(1.1)"
#     And the user tag the cell "(1,2)" as a suspected mine
#     And the user tag the cell "(2,2)" as a suspected mine
#     And the user tag the cell "(3,2)" as a questionable mine
#     And the user reveals the cell "(2,3)"
#     When the user resets the game (the board data es reloaded with new values)
#     Then the untagged mine counter should be: 10
#     And the time counter should be: 0
#     And all the cells should be: "hidden"
#     And all the cells should be: "enabled"
#     And all the cells should be: "untagged"
#
# #TODO: //the user press the "resetButton" reset button
#
#
# Scenario: Disabling all the cells on the board by game over
#     Given the user loads the following mock data: "###-##x-###"
#     When the user reveals the cell "(2,3)" with a mine
#     Then todas las celdas desactivadas
#     And the cell "(1,1)" shoould be disabled
#     And the cell "(1,2)" shoould be disabled
#     And the cell "(1,3)" shoould be disabled
#     And the cell "(2,1)" shoould be disabled
#     And the cell "(2,2)" shoould be disabled
#     And the cell "(2,3)" shoould be disabled
#     And the cell "(3,1)" shoould be disabled
#     And the cell "(3,2)" shoould be disabled
#     And the cell "(3,3)" shoould be disabled
#
# Scenario: Enabling all the cells on the board
#     Given the user laods the following mock data: "o11-o1x-o11"
#     When the user press the "resetButton" reset button
#     Then the cell "(1,1)" shoould be enabled
#     And the cell "(1,2)" shoould be enabled
#     And the cell "(1,3)" shoould be enabled
#     And the cell "(2,1)" shoould be enabled
#     And the cell "(2,2)" shoould be enabled
#     And the cell "(2,3)" shoould be enabled
#     And the cell "(3,1)" shoould be enabled
#     And the cell "(3,2)" shoould be enabled
#     And the cell "(3,3)" shoould be enabled

#--------------------------------------------
#el win game ha de estar en core ?
#TODO
#Scenario: Win game -> all the cells without mines have been revealed
#    Given the user loads the following mock data: "oox"
#    When the user reveals the cell "(1,1)"
#    And the user reveals the cell "(1,2)"
#    Then the user should win the game
#
#   # //TODO: escenario(s) que explique las consecuencias en pantalla de ganar una partida
#
#
#Scenario: All the cells with mines have been tagged as a suspected mine -> Win the game
#    Given the user loads the following mock data:
#        """
#        xoo
#        xox
#        ooo
#        """
#    When the user tags the cell "(1,1)" as a suspected mine
#    And the user tags the cell "(2,1)" as a suspected mine
#    And the user tags the cell "(2,3)" as a suspected mine
#    Then the user should win the game
#
#
#Scenario: All the cells without mines have been revealed -> Win the game ->
#    Given the user loads the following mock data:
#        """
#        xoo
#        xox
#        ooo
#        """
#    When the user reveals the cell "(1,2)"
#    And the user reveals the cell "(1,3)"
#    And the user reveals the cell "(2,2)"
#    And the user reveals the cell "(3,1)"
#    And the user reveals the cell "(3,2)"
#    And the user reveals the cell "(3,3)"
#    Then the user should win the game