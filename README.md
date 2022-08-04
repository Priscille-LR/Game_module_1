# Wildlife Fighterz

[Click here to see deployed game](http://github.com)

## Description
WARNING: this game is not for the faint of heart! 
Wildlife Fighterz is a game where the player's objective is to save animals by shooting poachers. To do so, they have to use their mouse (acting as a sight) to aim and click to shoot. After that, a score is calculated based on the number of poachers killed and the number of animals saved: they earn 10 points for each poacher killed, and 5 points for each animal that reaches the end of the screen without being killed by a poacher's bullet. If the player shoots an animal by accident, they lose.

## MVP
- Characters appear randomly from the top of the screen
- Screen is split into 3 parts: 
    - Left and right sides: animals try to get through the savannah without being shot
    - Middle: poachers come down shooting animals sideways randomly
- Player can shoot poachers
- Player can shoot animals (they lose if they do, obv)
- Poachers can shoot bullets at animals

## Backlog
- Add sound effects
- Increase difficulty
- Add badges-winning logic 
- Add name input


## Data structure

### Index.js
- DOM logic + event listeners
- startGame()
- updateCanvas()
- updatePoachers()
- updateAnimals()
- createScorePanel()
- checkIfGameOver()
- gameOver()
- randomIntFromInterval()

### Game.js
- drawBackground()
- determineScore()


### Characters.js

#### Animal
- handleCharacter()
- detectCollision()
- killCharacter()

#### Poacher extends Animal
- handleCharacter()
- detectCollision()
- killCharacter()
- shootBullet()
- drawBulletWhenShooting()


### Target.js
- drawTarget()
- moveTarget()

### Bullet.js
- drawBullet()



## States y States Transitions
- Landing screen
- Instructions screen
- Game screen
- Game Over screen

## Tasks


## Links
- [Github repository Link](http://github.com)
- [Deployment Link](https://github.com/Priscille-LR/Wildlife_Fighterz)