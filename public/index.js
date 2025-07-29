const playBoard = document.querySelector(".play-board"),
  scoreElement = document.querySelector(".score"),
  highScoreElement = document.querySelector(".high-score"),
  controls = document.querySelectorAll(".controls i");

let gameOver = false,
  foodX,
  foodY,
  snakeX = 5,
  snakeY = 5,
  velocityX = 0,
  velocityY = 0,
  snakeBody = [],
  setIntervalId,
  score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;

function checkArrayInArray(arr, farr) {
  if (JSON.stringify(arr).includes(JSON.stringify(farr))) return true;
  return false;
}

const updateFoodPosition = () => {
  let fulfilled = false;
  while (!fulfilled) {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    if (!checkArrayInArray(snakeBody, [foodX, foodY])) {
      fulfilled = true;
    }
  }
};

const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game Over! Press OK to replay");
  location.reload();
};

const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

controls.forEach((btn) =>
  btn.addEventListener("click", () => changeDirection({ key: btn.dataset.key }))
);

const initGame = () => {
  if (gameOver) return handleGameOver();
  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;
    highScore = score >= highScore ? score : highScore;

    localStorage.setItem("high-score", highScore);
    scoreElement.innerHTML = `Score: ${score}`;
    highScoreElement.innerHTML = `High Score: ${highScore}`;
  }

  snakeX += velocityX;
  snakeY += velocityY;

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeX <= 0) {
    snakeX = 30;
  } else if (snakeX > 30) {
    snakeX = velocityX;
  } else if (snakeY <= 0) {
    snakeY = 30;
  } else if (snakeY > 30) {
    snakeY = velocityY;
  }

  snakeBody[0] = [snakeX, snakeY];

  for (let index = 0; index < snakeBody.length; index++) {
    if (
      snakeBody[0] >= 30 ||
      snakeBody[0] <= 0 ||
      snakeBody[1] >= 30 ||
      snakeBody[1] <= 0
    ) {
      console.log(snakeBody);
    }
  }

  for (let i = 0; i < snakeBody.length; i++) {
    html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = html;
};

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);
