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
      And all the cells should be: "covered";

   Scenario: Default untagged mines counter
      And the untagged mines counter should be the following value: 10

   Scenario: Default time counter
      And the time counter should be the following value: "00:00"


   Scenario: Default button reset -> the button should show a icon depending of the state at the game
      And the button status should be the following value : boredFace


   Scenario: Tagging a cell with a suspected mine
      When the user tag the cell "2-3" as a suspected mine
      Then the cell "2-3" should show a exclamation symbol

   Scenario: Untagging a cell with a suspected mine
      When the user untag the cell "2-3"
      Then the cell "2-3" should be empty


   Scenario: Tagging a cell with a questionable mine
      When the user tag the cell "2-3" as a questionable mine
      Then the cell "2-3" should be a question symbol

   Scenario: Untagging a cell with a questionable mine
      When the user untag the cell "2-3"
      Then the cell "2-3" should be empty


   Scenario: Untagged mines counter -> the counter should start to decrease
      When the user tag the cell "2-3" as a suspected mine
      Then the untagged mine counter shoould be the following value: 9

   Scenario: Untagged mines counter -> the counter should start to increase
      When the user untag the cell "2-3"
      Then the untagged mine counter shoould be the following value: 10


   Scenario: using the mouse click -> Revealing a cell
      Given the user loads the following mock data: "xoo-ooo-ooo"
      When ther user press left click on the cell "2-3"
      Then the cell "2-3" should be revealed


   Scenario: End game -> the button reset should show the status sadFace
      Given the user loads the following mock data: "ooo-oox-ooo"
      When the user reveals the cell "2-3"
      Then the button reset should be the following value: sadFace


   Scenario: Win game -> the button reset shouLd show the status happyFace
      Given the user loads the following mock data: "xxx-xxo-xxx"
      When the user reveals the cell "2-3"
      Then the button reset should be the following value: happyFace

   @manual
   Scenario: Time counter, the time counter should increase when the user starts to reveals a cell without a bomb
      Given the user loads the following mock data: "###-##o-###"
      When the user reveals the cell "2-3"
      Then the time counter start to increase in seconds


   @manual
   Scenario: Time counter, the time counter should be stop when the user reveals a cell with bomb
      Given the user loads the following mock data: "ooo-oox-ooo"
      When the user reveals the cell "2-3"
      Then the time counter should be stop


   Scenario: Restart the game
      When the user resets the game
      Then the untagged mine counter should be: 10
      And the time counter should be: "00:00"
      And all the cells should be: "covered"
      And all the cells should be: "enabled"
      And all the cells should be: "untagged"


   Scenario: Disabling all the cells on the board by game over
      Given the user loads the following mock data: "ooo-oox-ooo"
      When the user reveals the cell "2-3"
      Then all the cells should be: "disabled"
