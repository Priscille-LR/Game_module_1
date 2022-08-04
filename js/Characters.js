let poacherLeft = '../assets/poacher-left.png';
let poacherRight = '../assets/poacher-right.png';

let bulletLeft = '../assets/bullet-left.png';
let bulletRight = '../assets/bullet-right.png';


class Animal {
  constructor(x, y, width, height, img) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.character = new Image();
    this.character.src = img;
    this.hasBeenShotByPlayer = false;
    this.hasBeenShotByBullet = false;
    this.killedFrequency = 1;
  }

  handleCharacter() {
    if (this.hasBeenShotByPlayer) {
      isGameOver = true;
      return;
    }

    if(this.hasBeenShotByBullet) {
        if(this.killedFrequency % 100 === 0){
            currentGame.animals.splice(currentGame.animals.indexOf(this),1)
        }
        this.killedFrequency++
    }

    if (!this.hasBeenShotByPlayer) {
        if(!this.hasBeenShotByBullet){
            const isShotByBullet = this.checkIfShotByBullet()
            if(isShotByBullet) {
                this.hasBeenShotByBullet = true;
                this.character.src = '../assets/stars.png'
            }
        }
        ctx.drawImage(this.character, this.x, this.y, this.width, this.height)
    }


    //character moves only if still alive
    if (!this.hasBeenShotByPlayer && !this.hasBeenShotByBullet) {
      this.y += (initialSpeed + 1)
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

  detectCollision(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }

  checkIfShotByBullet() {
    return currentGame.bullets.map((bullet) => {
        let isCollision = this.detectCollision(bullet.x, bullet.y, bullet.height, bullet.width)
        if(isCollision){
            bullet.remove()
        }
        return isCollision
    }).includes(true);
  }

  killCharacter() {
    this.hasBeenShotByPlayer = true;
  }
}



class Poacher extends Animal {
  constructor(x, y, width, height) {
    super(x, y, width, height, poacherRight);
    this.frequency = 0;
    this.isRight = true;
    this.isDisplayed = true;
    this.changeRandom = randomIntFromInterval(0, 200);
    this.killedFrequency = 0;
    this.shooting = false
    this.shot = false
  }

  handleCharacter() {
    if (this.hasBeenShotByPlayer) {
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
    if (!this.hasBeenShotByPlayer) {
      this.y += (initialSpeed + 1)
      
      if (this.y > canvas.height) {
        this.y = -400;
        this.x = randomIntFromInterval(middle, right - 120);
        currentGame.poachersKilled -= 1; //if poacher doesnt get killed before it reaches end of canvas => - poacher killed = -10 points
      }
    }
  }

  shootBullet() {
    if(!this.hasBeenShotByPlayer && !this.shooting && this.y < canvas.height && this.y > 0){
        this.bullet = new Bullet(this.isRight, this.isRight ? bulletRight : bulletLeft);
        currentGame.bullets.push(this.bullet)
        this.bullet.x = this.x
        this.bullet.y = this.y + 20 - this.bullet.height / 2
        this.shooting = true;
    }
  }

  drawBulletWhenShooting() {
    if(this.shooting && this.bullet.direction === true){
        this.bullet.x += this.bullet.speed
        this.bullet.drawBullet(this.bullet.x, this.bullet.y, this.bullet.width, this.bullet.height)
        ;
    }

    if(this.shooting && this.bullet.direction === false){
        this.bullet.x -= this.bullet.speed
        this.bullet.drawBullet(this.bullet.x, this.bullet.y, this.bullet.width, this.bullet.height)
    }

    if(this.bullet != undefined && (this.bullet.x > canvas.width || this.bullet.x < 0)) {
        this.shooting = false    
        this.bullet = undefined
    }
  }
}
