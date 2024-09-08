// Global Variables
const board = document.querySelector(".board")
const gridSize = 5
let currentPlayer = 1
let player = document.querySelector("#game-status-message")

// Functions For Game Logic
function createBoard() {
  let idCounter = 0
  for (let row = 0; row < gridSize * 2 - 1; row++) {
    for (let col = 0; col < gridSize * 2 - 1; col++) {
      if (row % 2 === 0 && col % 2 === 0) {
        const dot = document.createElement("div")
        dot.classList.add("dot")
        board.appendChild(dot)
      } else if (row % 2 === 0 && col % 2 === 1) {
        const hLine = document.createElement("div")
        hLine.classList.add("horizontal-line")
        hLine.setAttribute("id", `line-${idCounter}`)
        board.appendChild(hLine)
        idCounter++
      } else if (row % 2 === 1 && col % 2 === 0) {
        const vLine = document.createElement("div")
        vLine.classList.add("vertical-line")
        vLine.setAttribute("id", `line-${idCounter}`)
        board.appendChild(vLine)
        idCounter++
      } else {
        const emptySpace = document.createElement("div")
        board.appendChild(emptySpace)
      }
    }
  }

  const lines = board.querySelectorAll(".horizontal-line, .vertical-line")
  lines.forEach((line) => line.addEventListener("click", handleLineClick))
}

const switchPlayer = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1
  player.innerText = `Player ${currentPlayer}'s Turn`
}

const handleLineClick = (event) => {
  const line = event.target
  line.style.backgroundColor = currentPlayer === 1 ? "#d80032" : " #003049"
  console.log(line.id)
  line.removeEventListener("click", handleLineClick)
  switchPlayer()
}
const checkForBox = (line) => {}
const checkForGameEnd = () => {}
const resetGame = () => {}

createBoard()
// Event Listeners
