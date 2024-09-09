let currentPlayer = 1
let playerColors = ["#FF0080", "#0080FF"]
let player1Score = 0
let player2Score = 0
let board = document.querySelector(".board")
let resetbtn = document.querySelector("#restart-btn")

// Create a static 5x5 board with boxes
const createBoard = () => {
  for (let i = 0; i < 25; i++) {
    // 5x5 = 25 boxes
    let box = document.createElement("div")
    box.classList.add("box")

    // Add four lines to each box (top, bottom, left, right)
    ;["top", "bottom", "left", "right"].forEach((type) => {
      const line = document.createElement("div")
      line.classList.add("line", `${type}-line`)
      line.style.backgroundColor = "lightgray"
      line.addEventListener("click", handlelineClick)
      box.appendChild(line)
    })

    board.appendChild(box)
  }
}

// Track which lines are clicked and check if a box is completed
const handlelineClick = (event) => {
  let line = event.target
  if (line.style.backgroundColor !== "lightgray") return //if its clicked not click it again

  line.style.backgroundColor = currentPlayer === 1 ? "#FF0080" : "#0080FF"

  // Check if the box is completed (all 4 lines clicked)
  let box = line.parentElement
  let alllines = box.querySelectorAll(".line")
  let allClicked = Array.from(alllines).every(
    (line) => line.style.backgroundColor !== "lightgray"
  )

  if (allClicked) {
    let boxColor = currentPlayer === 1 ? "#FF0080" : "#0080FF"
    box.style.backgroundColor = boxColor
    alllines.forEach((e) => (e.style.backgroundColor = "white"))
    updateScore()
  } else {
    // Switch to the next player
    switchPlayer()
  }
  checkEndGame()
}

// const to switch between players
const switchPlayer = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1
  document.getElementById(
    "game-status-message"
  ).innerText = `Player ${currentPlayer}'s Turn`
}

const updateScore = () => {
  let score = currentPlayer === 1 ? (player1Score += 10) : (player2Score += 10)
  document.getElementById(`player${currentPlayer}-score`).innerText = score
}

const resetGame = () => {
  player1Score = 0
  player2Score = 0
  document.getElementById("player1-score").innerText = player1Score
  document.getElementById("player2-score").innerText = player2Score
  currentPlayer = 1
  document.getElementById(
    "game-status-message"
  ).innerText = `Player ${currentPlayer}'s Turn`
  document.querySelectorAll(".box").forEach((box) => {
    box.style.backgroundColor = "white"

    box.querySelectorAll(".line").forEach((line) => {
      line.style.backgroundColor = "lightgray"
    })
  })
}

const checkEndGame = () => {
  // Get all boxes
  const boxes = document.querySelectorAll(".box")

  // Variable to track if all boxes are completed
  let allBoxesCompleted = true

  // Check if each box is completed
  boxes.forEach((box) => {
    if (
      box.style.backgroundColor === "" ||
      box.style.backgroundColor === "white"
    ) {
      allBoxesCompleted = false
    }
  })

  if (allBoxesCompleted) {
    // Determine the winner based on scores
    let winner
    if (player1Score > player2Score) {
      winner = "Player 1 Wins!"
    } else if (player2Score > player1Score) {
      winner = "Player 2 Wins!"
    } else {
      winner = "It's a Draw!"
    }

    // Display the result
    document.getElementById("game-status-message").innerText = winner
  }
}

// Initialize the board
createBoard()
resetbtn.addEventListener("click", resetGame)
