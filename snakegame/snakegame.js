let canvas, ctx;
let snake;
let food;
let gridSize = 20;
let tileSize = 20;
let score = 0;
let gameInterval;

function startGame() {
  canvas = document.getElementById("game-board");
  ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 400;

  snake = new Snake();
  food = new Food();

  document.addEventListener("keydown", changeDirection);

  gameInterval = setInterval(updateGame, 500);
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.update();
  snake.draw();

  food.draw();

  if (snake.eat(food)) {
    food.newLocation();
    score++;
  }

  if (snake.collide()) {
    clearInterval(gameInterval);
    alert("Game Over! Your score is: " + score);
    window.location.reload();
  }

  drawScore();
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function changeDirection(e) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (e.keyCode === LEFT_KEY && snake.dx !== gridSize) {
    snake.changeDirection(-gridSize, 0);
  } else if (e.keyCode === RIGHT_KEY && snake.dx !== -gridSize) {
    snake.changeDirection(gridSize, 0);
  } else if (e.keyCode === UP_KEY && snake.dy !== gridSize) {
    snake.changeDirection(0, -gridSize);
  } else if (e.keyCode === DOWN_KEY && snake.dy !== -gridSize) {
    snake.changeDirection(0, gridSize);
  }
}

class Snake {
  constructor() {
    this.body = [{ x: 200, y: 200 }, { x: 180, y: 200 }, { x: 160, y: 200 }];
    this.dx = gridSize;
    this.dy = 0;
  }

  draw() {
    ctx.fillStyle = "green";
    this.body.forEach((part) => {
      ctx.fillRect(part.x, part.y, tileSize, tileSize);
    });
  }

  update() {
    const head = { x: this.body[0].x + this.dx, y: this.body[0].y + this.dy };
    this.body.unshift(head);

    if (!this.eat(food)) {
      this.body.pop();
    }
  }

  eat(food) {
    return (
      this.body[0].x === food.x &&
      this.body[0].y === food.y
    );
  }

  collide() {
    for (let i = 1; i < this.body.length; i++) {
      if (this.body[i].x === this.body[0].x && this.body[i].y === this.body[0].y) {
        return true;
      }
    }

    const hitLeftWall = this.body[0].x < 0;
    const hitRightWall = this.body[0].x >= canvas.width;
    const hitTopWall = this.body[0].y < 0;
    const hitBottomWall = this.body[0].y >= canvas.height;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
  }

  changeDirection(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }
}

class Food {
  constructor() {
    this.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    this.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, tileSize, tileSize);
  }

  newLocation() {
    this.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    this.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
  }
}
