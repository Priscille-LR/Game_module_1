//canvas
const canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// global variables

let currentGame;
let currentTarget;

let intervalId = 0;
let isGameOver = false;

let poacherFrequency = 0;
let animalFrequency = 0;

//split screen in 3
let middle = canvas.width / 3
let left = 0
let right = 2 * canvas.width / 3


//screens
let landing = document.querySelector('.game-landing');
let startscreen = document.querySelector('.game-intro');
let gameOverScreen = document.querySelector('.game-over');


//listeners

window.onload = () => {
  startscreen.style.display = 'none';
  canvas.style.display = 'none';
  gameOverScreen.style.display = 'none';

  document.querySelector('.play-button').onclick = () => {
    landing.style.display = 'none';
    startscreen.style.display = 'flex';
  };
};

document.querySelector('.start-button').onclick = () => {
  startGame();
};

document.querySelector('.exit-button').onclick = () => {
    gameOverScreen.style.display = 'none';
    landing.style.display = 'flex';
};

document.querySelector('.retry-button').onclick = () => {
    gameOverScreen.style.display = 'none';
    canvas.style.display = 'flex';
    startGame();
};

// document.addEventListener('keydown', (e) => {
//   let direction = e.code;
//   //currentGame.target.moveTarget(direction);
// });

canvas.addEventListener('mousemove', (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Get the local x/y coordinates of the mouse on the canvas
  let x = e.clientX - canvas.offsetLeft;
  let y = e.clientY - canvas.offsetTop;

  currentGame.target.moveTarget(x, y);
});


canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect(); //returns object providing information about the size of an element and its position relative to the viewport
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  //kill poacher
  currentGame.poachers.forEach((poacher) => {
    if(poacher.isTouched(x, y)) {
        poacher.killPoacher()
    }
  })
});


function startGame() {
  landing.style.display = 'none';
  startscreen.style.display = 'none';
  canvas.style.display = 'flex';
  gameOverScreen.style.display = 'none';

  currentGame = new Game();
  currentTarget = new Target();
  currentGame.target = currentTarget;

  currentGame.drawBackground();
  currentGame.target.drawTarget();

  updateCanvas();
}


function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  currentGame.drawBackground();
  currentGame.target.drawTarget();

  poacherFrequency++
  animalFrequency++

  updatePoachers()

  updateAnimals()

  createScorePanel()

  checkIfGameOver()

    if(!isGameOver) {
        intervalId = requestAnimationFrame(updateCanvas);
    } else if(isGameOver) {
        gameOver()
    }
}

//helper function
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//draw poachers ~ every 5 seconds
function updatePoachers() {
  if (poacherFrequency % 500 === 1 && currentGame.poachers.length < 5) {
    let randomX = randomIntFromInterval(middle, right - 120)
    let newPoacher = new Poacher(randomX, -400, 120, 150);
    currentGame.poachers.push(newPoacher);
  }
  currentGame.poachers.forEach((poacher) => poacher.handleCharacter());
}

const images = [
    '../assets/elephant.png',
    '../assets/giraffe.png',
    '../assets/gorilla.png',
    '../assets/lion.png',
    '../assets/zebra.png',
];

//draw animals
function updateAnimals() {
  if (animalFrequency % 300 === 0 && currentGame.animals.length < 10) {
    let randomAnimalImg = images[(currentGame.animals.length + currentGame.score) % images.length];
    let randomX = currentGame.animals.length % 2 === 0 ? randomIntFromInterval(left, middle - 130) : randomIntFromInterval(right, canvas.width - 130)
    newAnimal = new Animal(randomX, -400, 120, 130, randomAnimalImg);
    currentGame.animals.push(newAnimal);
    console.log(currentGame.animals);
   
  }
  currentGame.animals.forEach((animal) => animal.handleCharacter());
}

function createScorePanel() {
  ctx.font = '36px One Trick Pony OT';
  ctx.fillStyle = '#FF914D';
  ctx.fillText(`Animals saved: ${currentGame.animalsSaved}`, 100, 50);
  ctx.fillText(`Poachers killed: ${currentGame.poachersKilled}`, 100, 100);
  ctx.fillText(`Score: ${currentGame.animalsSaved * 3 + currentGame.poachersKilled * 10}`, 100, 150);
}

function checkIfGameOver() {
    if(currentGame.poachersKilled < 0 || currentGame.animalsSaved < 0) {
        isGameOver = true
    }
}

function gameOver() {
  cancelAnimationFrame(intervalId);
  gameOverScreen.style.display = 'flex';
  canvas.style.display = 'none';
  isGameOver = false;
}