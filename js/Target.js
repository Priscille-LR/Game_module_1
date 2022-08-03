class Target {
  constructor() {
    this.x = 800;
    this.y = 730;
    this.width = 100;
    this.height = 100;
    this.target = new Image();
    this.target.src = '../assets/target.png'
  }

  drawTarget() {
    ctx.drawImage(this.target, this.x, this.y, this.width, this.height);
  }

  moveTarget(x, y) {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    this.x = (x - this.width / 2)
    this.y = (y -  this.height / 2)
    // switch (e) {
    //   case 'ArrowRight':
    //     if (this.x > 0) {
    //       this.x += 20;
    //     }
    //     break;

    //   case 'ArrowLeft':
    //     if (this.x < canvas.width) {
    //       this.x -= 20;
    //     }
    //     break;

    //   default:
    //     this.x -= 0;
    //     break;
    // }
    ctx.drawImage(this.target, this.x , this.y , this.width, this.height);
  }
}
