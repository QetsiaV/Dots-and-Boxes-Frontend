// Global Variables
const board = document.querySelector(".board")
const gridSize = 5
let currentPlayer = 1
let player = document.querySelector("#game-status-message")
let lines = []
let lineIndex = 0
let score1 = 0
let score2 = 0
let player1Score = document.querySelector("#player1-score")
let player2Score = document.querySelector("#player2-score")
let completedBoxes = []
let reset = document.querySelector("#restart-btn")

// Functions For Game Logic
const createBoard = () => {
  // Loop to create dots and lines
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (row % 2 === 0 && col % 2 === 0) {
        // Create a dot
        const dot = document.createElement("div")
        dot.classList.add("dot")
        board.appendChild(dot)
      } else if (row % 2 === 0 && col % 2 === 1) {
        // Create a horizontal line
        createLineElement("horizontal-line", lineIndex)
        lineIndex++
      } else if (row % 2 === 1 && col % 2 === 0) {
        // Create a vertical line
        createLineElement("vertical-line", lineIndex)
        lineIndex++
      } else {
        const emptySpace = document.createElement("div")
        emptySpace.classList.add("empty-space")
        board.appendChild(emptySpace)
      }
    }
  }
}

const createLineElement = (type, lineIndex) => {
  const line = document.createElement("div")
  line.classList.add(type)
  line.index = lineIndex
  line.addEventListener("click", (event) =>
    handleLineClick(event, type, lineIndex)
  )
  board.appendChild(line)
}

const switchPlayer = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1
  player.innerText = `Player ${currentPlayer}'s Turn`
}

const handleLineClick = (event) => {
  const line = event.target
  const type = line.classList.contains("horizontal-line")
    ? "horizontal-line"
    : "vertical-line"
  const lineIndex = line.index
  console.log(lineIndex)
  if (lines[lineIndex]) return
  line.style.backgroundColor = currentPlayer === 1 ? "#d80032" : "#003049"
  line.removeEventListener("click", handleLineClick)
  lines[lineIndex] = true
  const boxCompleted = checkForBox(lineIndex, type)
  if (!boxCompleted) {
    switchPlayer()
  } else {
    checkForGameEnd()
  }
}

const checkForBox = (lineIndex, type) => {
  let boxLines = []
  let boxCompleted = false

  if (type === "horizontal-line") {
    const isTopRow = Math.floor(lineIndex / 9) === 0
    const isBottomRow = Math.floor(lineIndex / 9) === gridSize - 1

    boxLines = [
      ...(isTopRow
        ? []
        : [[lineIndex, lineIndex - 4, lineIndex - 5, lineIndex - 9]]),
      ...(isBottomRow
        ? []
        : [[lineIndex, lineIndex + 4, lineIndex + 5, lineIndex + 9]]),
    ]
  } else if (type === "vertical-line") {
    const isLeftColumn = lineIndex % 9 === 0
    const isRightColumn = lineIndex % 9 === 8

    boxLines = [
      ...(isLeftColumn
        ? []
        : [[lineIndex, lineIndex - 1, lineIndex - 5, lineIndex + 4]]),
      ...(isRightColumn
        ? []
        : [[lineIndex, lineIndex + 1, lineIndex + 5, lineIndex - 4]]),
    ]
  }

  for (const box of boxLines) {
    // Sort the indices to ensure consistent order
    const sortedBox = box.slice().sort((a, b) => a - b)
    const boxString = sortedBox.join("-")

    if (!completedBoxes.includes(boxString)) {
      if (box.every((index) => lines[index])) {
        changeScore()
        console.log("Box is completed!")
        completedBoxes.push(boxString) // Mark this box as completed
        boxCompleted = true
      }
    }
  }

  return boxCompleted
}

const changeScore = () => {
  if (currentPlayer === 1) {
    score1 += 10
    player1Score.innerText = score1
  } else {
    score2 += 10
    player2Score.innerText = score2
  }
}

const checkForGameEnd = () => {
  if (completedBoxes.length === 16) {
    if (score1 > score2) {
      player.innerText = `Player 1 wins!`
    } else if (score1 < score2) {
      player.innerText = `Player 2 wins!`
    } else {
      player.innerText = `Tie! Try again`
    }
  }
}
const resetGame = () => {
  // Clear completed boxes
  completedBoxes = []

  // Reset scores
  score1 = 0
  score2 = 0
  player1Score.innerText = score1
  player2Score.innerText = score2

  // Reset the lines array
  lines = []

  // Reset the board
  document
    .querySelectorAll(".horizontal-line, .vertical-line")
    .forEach((line) => {
      line.style.backgroundColor = ""
      line.addEventListener("click", (event) =>
        handleLineClick(
          event,
          line.classList.contains("horizontal-line")
            ? "horizontal-line"
            : "vertical-line",
          line.index
        )
      )
    })

  // Set the initial player
  currentPlayer = 1
  player.innerText = `Player ${currentPlayer}'s Turn`

  // Optionally hide/reset any additional UI elements
  // Example: document.querySelector("#reset-button").style.display = "none"
}

createBoard()

reset.addEventListener("click", resetGame)
