const canvas = document.getElementById("snakeShit");
const startGameBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const gameMenu = document.querySelector(".menu");
var ctx = canvas.getContext("2d");
var food = { x: 30, y: 10 };
let firstGame = true;

var snake = [
  { x: 10, y: 30 },
  { x: 10, y: 20 },
  { x: 10, y: 10 }
];
var direction = "down";
var gameover = false;
let gameStarted = false;
var food = {
  x: Math.floor(Math.random() * canvas.width / 10) * 10,
  y: Math.floor(Math.random() * canvas.height / 10) * 10
};

function drawSnake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "red";
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(snake[i].x, snake[i].y, 10,10);
  }

 ctx.fillStyle = "orange";
  ctx.fillRect(food.x, food.y, 10, 10);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeRect(food.x, food.y, 10, 10);
}

function moveSnake() {
  var headX = snake[0].x;
  var headY = snake[0].y;
   if (direction === "down") {
    headY += 10;
  } else if (direction === "up") {
    headY -= 10;
  } else if (direction === "left") {
    headX -= 10;
  } else if (direction === "right") {
    headX += 10;
  }
  if (headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height) {
    gameover = true;
    openGameMenu();
  }
  if (headX === food.x && headY === food.y) {
    snake.unshift({ x: headX, y: headY });
    drawFood();
  } else {
  snake.pop();
  snake.unshift({ x: headX, y: headY });
  }
}

function checkCollision() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      gameover = true;
      openGameMenu();
      break;
    }
  }
}

function drawFood() {
	let good = false;
    while(!good) {
    	food = {
      		x: Math.floor(Math.random() * canvas.width / 10) * 10,
     		y: Math.floor(Math.random() * canvas.height / 10) * 10
    	};
    	let snakeIsThere = snake.find(box => box.x == food.x && box.y == food.y);
    	if (!snakeIsThere) good = true;
    }
}

function closeGameMenu() {
	gameMenu.style.display = "none";
}

function openGameMenu() {
	gameMenu.style.display = "flex";
// 	if (!firstGame) {
		startGameBtn.style.display = "none";
		restartBtn.style.display = "block";
// 	}
}


document.addEventListener("keydown", (event) => {
if (!gameStarted) return;
  if (event.code === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.code === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.code === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.code === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});

document.addEventListener("keypress", (event) => {
	console.log(event);
	if (event.code == "Enter") {
		gameStarted = true;
    snake = [
  		{ x: 10, y: 30 },
  		{ x: 10, y: 20 },
  		{ x: 10, y: 10 }
	];
	direction = "down";
	gameover = false;
	drawSnake();
	drawFood();
	closeGameMenu();
	}
});

startGameBtn.addEventListener("click", (event) => {
	gameStarted = true;
	snake = [
  		{ x: 10, y: 30 },
  		{ x: 10, y: 20 },
  		{ x: 10, y: 10 }
	];
	direction = "down";
	gameover = false;
	drawSnake();
	drawFood();
	closeGameMenu();
})
restartBtn.addEventListener("click", (event) => {
    gameStarted = true;
    snake = [
  		{ x: 10, y: 30 },
  		{ x: 10, y: 20 },
  		{ x: 10, y: 10 }
	];
	direction = "down";
	gameover = false;
	drawSnake();
	drawFood();
	closeGameMenu();
})
setInterval(function() {
if (!gameStarted) return;
if (!gameover) {
  moveSnake();
  drawSnake();
  checkCollision();
} else {
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over", canvas.width/2-75, canvas.height/2);
  }
},150);

drawSnake();
drawFood();