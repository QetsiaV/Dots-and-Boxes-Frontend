let currentPlayer = 1
let playerColors = ["#FF0080", "#0080FF"]
let player1Score = 0
let player2Score = 0
let board = document.querySelector(".board")
let resetbtn = document.querySelector("#restart-btn")
let gridSize = 5

const createDot = () => {
  const dot = document.createElement("div")
  dot.classList.add("corner-dot")
  return dot
}

const createBoard = () => {
  for (let i = 0; i < gridSize * gridSize; i++) {
    let box = document.createElement("div")
    box.classList.add("box")
    ;["top-left", "top-right", "bottom-left", "bottom-right"].forEach(
      (position) => {
        const dot = createDot()
        box.appendChild(dot)
        if (position === "top-left") {
          dot.style.top = "4px"
          dot.style.left = "4px"
        } else if (position === "top-right") {
          dot.style.top = "4px"
          dot.style.right = "4px"
        } else if (position === "bottom-left") {
          dot.style.bottom = "4px"
          dot.style.left = "4px"
        } else if (position === "bottom-right") {
          dot.style.bottom = "4px"
          dot.style.right = "4px"
        }
      }
    )
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

const handlelineClick = (event) => {
  let line = event.target
  if (line.style.backgroundColor !== "lightgray") return

  line.style.backgroundColor = currentPlayer === 1 ? "#FF0080" : "#0080FF"

  let box = line.parentElement
  let alllines = box.querySelectorAll(".line")
  let allClicked = [...alllines].every(
    (line) => line.style.backgroundColor !== "lightgray"
  )

  if (allClicked) {
    let boxColor = currentPlayer === 1 ? "#FF0080" : "#0080FF"
    box.style.backgroundColor = boxColor
    alllines.forEach((e) => (e.style.backgroundColor = "white"))
    updateScore()
  } else {
    switchPlayer()
  }
  checkEndGame()
}

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
  const boxes = document.querySelectorAll(".box")

  let allBoxesCompleted = true

  boxes.forEach((box) => {
    if (box.style.backgroundColor === "white") {
      allBoxesCompleted = false
    }
  })

  if (allBoxesCompleted) {
    let winner
    if (player1Score > player2Score) {
      winner = "Player 1 Wins!"
    } else if (player2Score > player1Score) {
      winner = "Player 2 Wins!"
    } else {
      winner = "It's a Draw!"
    }

    document.getElementById("game-status-message").innerText = winner
  }
}

createBoard()
resetbtn.addEventListener("click", resetGame)
