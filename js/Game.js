class Game {
    constructor() {
        this.target = {},
        this.poachers = [];
        this.animals = [];
        this.animalsSaved = 0;
        this.poachersKilled = 0;
        this.score = 0;
    }

    drawBackground() {
        let background = new Image();
        background.src = '../assets/canvas.png';
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    }
}