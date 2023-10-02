//:-D create 25 boxes in board container
const boxContainer = document.getElementById("board");

function createEmptyBox() {
  for (let i = 0; i < 5 * 5; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    boxContainer.appendChild(box);
  }
}

createEmptyBox();

//<3 start the project logic
const GD = "x";
const VD = "o";
const boxesElement = document.querySelectorAll(".box");
const winnerShowingElement = document.getElementById("result-container");
const winnerTextElement = document.getElementById("winner-text");
const winnerImageElement = document.getElementById("winner-img");
const playAgainButton = document.getElementById("play-again");
let oturn;
let WINNING_CONBINATION = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 19, 23],
  [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

handleStartGame();

function handleClick(e) {
  const targetBox = e.target;
  let currentClass = oturn ? VD : GD;
  targetBox.classList.add(currentClass);
  if (draw()) {
    showTheWinner("Red and Blue draw!!", "images/peace.jpg");
  } else if (win(currentClass)) {
    if (currentClass === GD) {
      showTheWinner("Red is the winner!!", "images/g-devit.jpg");
    } else {
      showTheWinner("blue is the winner!!", "images/vannda.jpg");
    }
  } else {
    swapTurn();
    setHoverOnBox();
  }
}

function swapTurn() {
  oturn = !oturn;
}

function setHoverOnBox() {
  if (oturn) {
    boxContainer.classList.remove(GD);
    boxContainer.classList.add(VD);
  } else {
    boxContainer.classList.remove(VD);
    boxContainer.classList.add(GD);
  }
}

function draw() {
  return [...boxesElement].every(checkDraw);
}

function checkDraw(box) {
  return box.classList.contains(GD) || box.classList.contains(VD);
}

function win(currentClass) {
  return WINNING_CONBINATION.some((combination) => {
    return combination.every((index) => {
      return boxesElement[index].classList.contains(currentClass);
    });
  });
}

function showTheWinner(winingMessage, winnerImg) {
  winnerShowingElement.classList.add("show");
  winnerTextElement.innerText = winingMessage;
  winnerImageElement.setAttribute("src", winnerImg);
  playAgainButton.addEventListener("click", handleStartGame);
}

function handleStartGame() {
  oturn = false;
  setHoverOnBox();
  winnerShowingElement.classList.remove("show");
  boxesElement.forEach((box) => {
    box.classList.remove(VD);
    box.classList.remove(GD);
    box.removeEventListener("click", handleClick);
    box.addEventListener("click", handleClick, { once: true });
  });

}
