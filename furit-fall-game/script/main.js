const FRUIT_COUNT = 10;

const scoreContainer = document.getElementById("score-container");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("start-button");
const coverScreen = document.querySelector(".cover-screen");
const result = document.getElementById("result");
const overText = document.getElementById("over-text");

const fruitsList = ["apple", "banana", "grapes"];

let fruits = [];
let points = 0;
let interval, randomCreationTime;

// Random number generator
const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Fruit constructor
class Fruit {
  constructor(image, x, y, width) {
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.src = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.speed = generateRandomNumber(1, 5);
    this.clicked = false;
    this.complete = false;
  }

  update() {
    this.y += this.speed;
    if (!this.complete && this.y + this.width > canvas.height) {
      this.complete = true;
    }
  }

  draw() {
    if (this.loaded) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.width);
    }
  }

  compare(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.width
    );
  }
}

// Create a new fruit
function createRandomFruit() {
  randomCreationTime = generateRandomNumber(3, 9);
  if (fruits.length < FRUIT_COUNT) {
    const randomFruit =
      fruitsList[generateRandomNumber(0, fruitsList.length - 1)];
    const randomImage = `./images/${randomFruit}.png`;
    const randomX = generateRandomNumber(0, canvas.width - 50);
    const fruitWidth = generateRandomNumber(100, 200);
    const fruit = new Fruit(randomImage, randomX, 0, fruitWidth);
    fruits.push(fruit);
  }
  checkGameStatus();
}

function checkGameStatus() {
  if (fruits.length === FRUIT_COUNT && fruits.every((fruit) => fruit.complete)) {
    clearInterval(interval);
    showGameOver();
  }
}

function showGameOver() {
  coverScreen.classList.remove("hide");
  canvas.classList.remove("hide");
  overText.classList.remove("hide");
  result.innerText = `Final Score: ${points}`;
  startButton.innerHTML = "Restart Game";
  scoreContainer.classList.add("hide");
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fruits.forEach((fruit) => {
    fruit.update();
    fruit.draw();
  });
  requestAnimationFrame(animate);
}

function handleFruitClick(e) {
  const clickX = e.clientX - canvas.offsetLeft;
  const clickY = e.clientY - canvas.offsetTop;
  fruits.forEach((fruit) => {
    if (!fruit.clicked && fruit.compare(clickX, clickY)) {
      fruit.clicked = true;
      points++;
      scoreContainer.innerHTML = points;
      fruit.complete = true;
      fruit.y = canvas.height;
    }
  });
}

canvas.addEventListener("click", handleFruitClick);
startButton.addEventListener("click", () => {
  fruits = [];
  points = 0;
  scoreContainer.innerHTML = points;
  canvas.classList.remove("hide");
  coverScreen.classList.add("hide");
  createRandomFruit();
  randomCreationTime = generateRandomNumber(3, 9);
  interval = setInterval(createRandomFruit, randomCreationTime * 1000);
  scoreContainer.classList.remove("hide");
});

// Initialize game
function initGame() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  animate();
}

initGame();
