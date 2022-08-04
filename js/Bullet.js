class Bullet {
  constructor(direction, src) {
    this.direction = direction
    this.x = 0;
    this.y = 0;
    this.width = 60;
    this.height = 20;
    this.speed = 10;
    this.bullet = new Image();
    this.bullet.src = src;
  }

  drawBullet() {
    ctx.drawImage(this.bullet, this.x, this.y, this.width, this.height);
  }

  remove(){
    console.group()
    console.log("removedBullet")
    let t = currentGame.bullets.splice(currentGame.bullets.indexOf(this), 1)
    console.log(" => " + t)
    console.groupEnd()
  }
}
