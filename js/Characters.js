let poacherLeft = '../assets/poacher-left.png';
let poacherRight = '../assets/poacher-right.png';

class Animal {
  constructor(x, y, width, height, img) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.character = new Image();
    this.character.src = img;
  }

  handleCharacter() {
    ctx.drawImage(this.character, this.x, this.y, this.width, this.height);

    //character mvt
    this.y += 1;
    if (this.y > canvas.height) {
      this.y = -400;
      this.x =
        currentGame.animals.indexOf(this) % 2 === 0 //make animal appear at the left/right of screen
          ? randomIntFromInterval(left, middle - 130)
          : randomIntFromInterval(right, canvas.width - 130);
      currentGame.animalsSaved++;
    }
  }
}

class Poacher extends Animal {
  constructor(x, y, width, height) {
    super(x, y, width, height, poacherRight);
    this.frequency = 0;
    this.isRight = true;
    this.isDisplayed = true;
    // this.isKilled = false
    this.changeRandom = randomIntFromInterval(0, 200);
    this.killedFrequency = 0;
  }

  handleCharacter() {
    if (this.isKilled) {
      this.character.src = '../assets/poacher-killed.png'; //display poacher killed if dead and make it blink
      this.killedFrequency++;
      if (this.killedFrequency % 30 === 0) {
        this.isDisplayed = !this.isDisplayed;
        if (this.killedFrequency % 150 === 0) {
          currentGame.poachers.splice(currentGame.poachers.indexOf(this), 1);
          currentGame.poachersKilled++;
          return;
        }
      }
    } else {
      this.frequency++;
      if (this.frequency % (300 + this.changeRandom) === 0) {
        this.isRight = !this.isRight;
        this.character.src = this.isRight ? poacherRight : poacherLeft; //flip poacher
      }
    }

    if (this.isDisplayed) {
      ctx.drawImage(this.character, this.x, this.y, this.width, this.height);
    }

    //character moves only if still alive
    if (!this.isKilled) {
      this.y += 5;
      if (this.y > canvas.height) {
        this.y = -400;
        this.x = randomIntFromInterval(middle, right - 120);
        currentGame.poachersKilled -= 1; //if poacher doesnt get killed before it reaches end of canvas => - poacher killed = -10 points
      }
    }
  }

  //
  isTouched(x, y) {
    return (
      (x > this.x && x < this.x + this.width) &&
      (y > this.y && y < this.y + this.height)
    );
  }

    // isTouched(x, y) {
    //   let isXtouched = false;
    //   let isYtouched = false;
    //   if (x > this.x && x < this.x + this.width) {
    //     isXtouched = true;
    //   }
    //   if (y > this.y && y < this.y + this.height) {
    //     isYtouched = true;
    //   }
    //   return isXtouched && isYtouched;
    // }

  killPoacher() {
    this.isKilled = true;
  }
}
