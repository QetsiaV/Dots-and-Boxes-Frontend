// Global Variables
let currentPlayer = 1
let player1Score = 0
let player2Score = 0
let totalBoxesCompleted = 0

// Fetch player names from localStorage
const player1Name = localStorage.getItem("player1Name") || "Player 1"
const player2Name = localStorage.getItem("player2Name") || "Player 2"

const board = document.querySelector(".board")
const player1panel = document.querySelector("#player1-score")
const player2panel = document.querySelector("#player2-score")
const gameStatusElement = document.querySelector("#game-status-message")
const restartBtn = document.querySelector("#restart-btn")
const gridSize = 5

// Selecting player panels for active shadow
const player1Panel = document.querySelector(".player1") // Player 1 panel
const player2Panel = document.querySelector(".player2") // Player 2 panel

// Update the player names in the UI
document.querySelector(".player1 h2").innerText = player1Name
document.querySelector(".player2 h2").innerText = player2Name

// Create the board (dots, lines, and boxes)
const createBoard = () => {
  const elements = gridSize * 2 - 1
  board.innerHTML = ""
  for (let row = 0; row < elements; row++) {
    for (let col = 0; col < elements; col++) {
      if (row % 2 === 0 && col % 2 === 0) {
        // Dot element
        const dot = document.createElement("div")
        dot.classList.add("dot")
        board.appendChild(dot)
      } else if (row % 2 === 0 && col % 2 === 1) {
        // Horizontal line element
        const horizontalLine = createLine("horizontal-line")
        board.appendChild(horizontalLine)
      } else if (row % 2 === 1 && col % 2 === 0) {
        // Vertical line element
        const verticalLine = createLine("vertical-line")
        board.appendChild(verticalLine)
      } else {
        // Box element
        const box = document.createElement("div")
        box.classList.add("box")
        box.dataset.completed = "false"
        board.appendChild(box)
      }
    }
  }
}

// Create a line element (either horizontal or vertical)
const createLine = (type) => {
  const line = document.createElement("div")
  line.classList.add(type)
  line.addEventListener("click", handleLineClick)
  return line
}

// Handle when a line is clicked
const handleLineClick = (event) => {
  const line = event.target

  // Check if the line has already been clicked
  if (line.style.backgroundColor) return

  // Set the line color based on the current player
  line.style.backgroundColor = currentPlayer === 1 ? "#ff0080" : "#0080ff"

  // Check if a box was completed by this move
  const boxCompleted = checkForBoxCompletion()

  // If no box was completed, switch to the next player
  if (!boxCompleted) {
    switchPlayer()
  }
}

// Check all the boxes and update the score if any box is completed
const checkForBoxCompletion = () => {
  let boxCompleted = false
  const boxes = document.querySelectorAll(".box")

  boxes.forEach((box) => {
    // Check if the box is already completed
    if (box.dataset.completed === "true") return

    // Check the four sides of the box
    const lines = [
      box.previousElementSibling, // Left (vertical line)
      box.nextElementSibling, // Right (vertical line)
      box.parentElement.children[
        Array.from(box.parentElement.children).indexOf(box) - 9
      ], // Top (horizontal line)
      box.parentElement.children[
        Array.from(box.parentElement.children).indexOf(box) + 9
      ], // Bottom (horizontal line)
    ]

    // If all four sides are filled, mark the box as completed
    if (lines.every((line) => line && line.style.backgroundColor)) {
      box.dataset.completed = "true"
      box.classList.add(
        currentPlayer === 1 ? "completed-player1" : "completed-player2"
      )

      // Update the score
      updateScore()
      totalBoxesCompleted++
      checkForGameEnd()
      boxCompleted = true // A box was completed
    }
  })
  return boxCompleted
}

const updateScore = () => {
  let score = currentPlayer === 1 ? (player1Score += 10) : (player2Score += 10)
  document.getElementById(`player${currentPlayer}-score`).innerText = score
}

// Switch the current player and update the UI with the active box shadow
const switchPlayer = () => {
  // Remove the active class from both panels
  player1Panel.classList.remove("player-active")
  player2Panel.classList.remove("player-active-2")

  // Switch the current player
  currentPlayer = currentPlayer === 1 ? 2 : 1
  gameStatusElement.innerText = `${
    currentPlayer === 1 ? player1Name : player2Name
  }'s Turn`

  // Add the active class to the current player's panel
  if (currentPlayer === 1) {
    player1Panel.classList.add("player-active")
  } else {
    player2Panel.classList.add("player-active-2")
  }
}

// Reset the game
const resetGame = () => {
  currentPlayer = 1
  player1Score = 0
  player2Score = 0
  totalBoxesCompleted = 0

  player1panel.innerText = player1Score
  player2panel.innerText = player2Score
  gameStatusElement.innerText = `${player1Name}'s Turn`
  player1Panel.classList.add("player-active")
  player2Panel.classList.remove("player-active-2")

  createBoard()
}

const checkForGameEnd = () => {
  const totalBoxes = (gridSize - 1) * (gridSize - 1) // Total number of boxes on the board

  if (totalBoxesCompleted === totalBoxes) {
    if (player1Score > player2Score) {
      gameStatusElement.innerText = `${player1Name} Wins!`
    } else if (player2Score > player1Score) {
      gameStatusElement.innerText = `${player2Name} Wins!`
    } else {
      gameStatusElement.innerText = "It's a Draw!"
    }
  }
}

// Initialize the game
createBoard()
restartBtn.addEventListener("click", resetGame)
