// Global Variables
const board = document.querySelector(".board")
const gridSize = 5
let currentPlayer = 1
let player = document.querySelector("#game-status-message")
let lines = []
let lineIndex = 0

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
  line.style.backgroundColor = currentPlayer === 1 ? "#d80032" : "#003049"
  line.removeEventListener("click", handleLineClick)
  lines[lineIndex] = true
  checkForBox(lineIndex, type)
  switchPlayer()
}

// Assume gridSize is defined somewhere else in your code.
let completedBoxes = []

const checkForBox = (lineIndex, type) => {
  let boxLines = []

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
    if (box.every((index) => lines[index])) {
      const boxString = box.join("-")
      console.log(boxString)
      if (!completedBoxes.includes(boxString)) {
        console.log("Box is completed!")
        completedBoxes.push(boxString) // Mark this box as completed
      }
    }
  }
}

const checkForGameEnd = () => {}
const resetGame = () => {}

createBoard()

// Event Listeners
