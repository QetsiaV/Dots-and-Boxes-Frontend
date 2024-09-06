## Pseudocode
  * Set up the game board with the dots
  * Initialize an empty object to store lines between dots each line will have index and status
  * Initalize an empty object to stor the box each box will have top, bottom, right, left and the player
  * Initialize Player 1 and Player 2 scores to 0
  * Set current turn to 'Player 1'
  * Display initial game board and scores
  * Start the game with player 1
  * Player should connects tow dots to make a line 
  * The line should be checked if its not already clicked 
  * The next player should take the turn
  * When a box is created it should mark for the player and change the box background and update the player score 
  * If the board is full the two scores should be compared to fined the winner 
  * Two buttons should be displayed
    * A restart button (reset the game to initial seting) or 
    * New game (should save the scores and create new game and update the scores ) 