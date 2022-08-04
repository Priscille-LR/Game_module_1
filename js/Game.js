class Game {
    constructor() {
        this.target = {},
        this.poachers = [];
        this.animals = [];
        this.bullets = [];
        this.animalsSaved = 0;
        this.poachersKilled = 0;
        this.score = 0;
    }

    drawBackground() {
        let background = new Image();
        background.src = './assets/images/canvas.png';
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    }

    determineScore(){
        this.score = this.animalsSaved * 5 + this.poachersKilled * 10
        return this.score
    }
}