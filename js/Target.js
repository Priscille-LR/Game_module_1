class Target {
  constructor() {
    this.x = 800;
    this.y = 730;
    this.width = 100;
    this.height = 100;
    this.target = new Image();
    this.target.src = './assets/images/target.png'
  }

  drawTarget() {
    ctx.drawImage(this.target, this.x, this.y, this.width, this.height);
  }

  moveTarget(x, y) {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    this.x = (x - this.width / 2)
    this.y = (y -  this.height / 2)
    ctx.drawImage(this.target, this.x , this.y , this.width, this.height);
  }
}
