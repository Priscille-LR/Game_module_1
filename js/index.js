//canvas
const canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// global variables

let currentGame;
let currentTarget;

//sounds
let bgMusic;
let impactSound;
let twinkle;
let gameOverSound;

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

//score board
function createScorePanel() {
  ctx.font = '36px One Trick Pony OT';
  ctx.fillStyle = '#FF914D';
  ctx.fillText(`Animals saved: ${currentGame.animalsSaved}`, 100, 50);
  ctx.fillText(`Poachers killed: ${currentGame.poachersKilled}`, 100, 100);
  ctx.fillText(`Score: ${currentGame.determineScore()}`, 100, 150);
}

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

  //kill poacher or animal onCLick
  currentGame.poachers.forEach((poacher) => {
    if(poacher.detectCollision(x, y, 1 , 1)) {
        impactSound = new Sound("./assets/sounds/impact.mp3")
        impactSound.play()
        poacher.killCharacter()
    }
  })

  currentGame.animals.forEach((animal) => {
    if(animal.detectCollision(x, y,  1 , 1)) {
        impactSound = new Sound("./assets/sounds/impact.mp3")
        impactSound.play()
        animal.killCharacter()
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

  bgMusic = new Sound("./assets/sounds/jungle-music.mp3")
  bgMusic.play()
  bgMusic.loop = true

  currentGame.drawBackground();
  currentGame.target.drawTarget();

  resetSpeed();
  mainLoop();
}


function mainLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  currentGame.drawBackground();
  currentGame.target.drawTarget();

  updateSpeed()

  updatePoachers()

  updateAnimals()

  createScorePanel()

  checkIfGameOver()

    if(!isGameOver) {
        intervalId = requestAnimationFrame(mainLoop);
    } else if(isGameOver) {
        gameOver()
    }
}

let speedFrequency = 0
let initialSpeed = 0

function updateSpeed(){
    if (speedFrequency % 2000 === 0){
        initialSpeed++
    }
    speedFrequency++
}

function resetSpeed() {
    speedFrequency = 0
    initialSpeed = 0
}


let timer = 0
function updatePoachers() {
    poacherFrequency++
  if (poacherFrequency % 200 === 0) {
    let randomX = randomIntFromInterval(middle, right - 120)
    let newPoacher = new Poacher(randomX, -400, 120, 150);
    currentGame.poachers.push(newPoacher);
  }

  currentGame.poachers.forEach((poacher) => poacher.handleCharacter());

  if(timer % 60 === 0 && timer !== 0 && currentGame.poachers.length != 0) {
    currentGame.poachers.sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .forEach((poacher) => poacher.shootBullet())
  }

  currentGame.poachers.forEach((poacher) => poacher.drawBulletWhenShooting())
    timer++
}

const images = [
    './assets/images/elephant.png',
    './assets/images/giraffe.png',
    './assets/images/gorilla.png',
    './assets/images/lion.png',
    './assets/images/zebra.png',
];

//draw animals
function updateAnimals() {
    animalFrequency++
  if (animalFrequency % 200 === 0) {
    let randomAnimalImg = images[(currentGame.animals.length + currentGame.score) % images.length];
    let randomX = currentGame.animals.length % 2 === 0 ? randomIntFromInterval(left, middle - 130) : randomIntFromInterval(right, canvas.width - 130) //randomise animals display
    newAnimal = new Animal(randomX, -400, 120, 130, randomAnimalImg);
    currentGame.animals.push(newAnimal);
  }
  currentGame.animals.forEach((animal) => animal.handleCharacter());
}


function checkIfGameOver() {
    if(currentGame.poachersKilled < 0 || currentGame.animalsSaved < 0) {
        isGameOver = true
    }
}

function gameOver() {
  cancelAnimationFrame(intervalId);

  bgMusic.stop()
  gameOverSound = new Sound("./assets/sounds/game-over.mp3")
  gameOverSound.play()

  gameOverScreen.style.display = 'flex';
  canvas.style.display = 'none';
  isGameOver = false;
}


//helper function
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}