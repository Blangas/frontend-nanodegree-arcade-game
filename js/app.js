// Enemies our player must avoid
class Enemy {
  constructor(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug-red.png';
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 40 + 60;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a delta time between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.speed;

    // check if enemy is off screen, then find it in array and delete it
    if (this.x > 909) {
      for (let i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x > 909) {
          allEnemies.splice(i, 1);
          break;
        }
      }
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class EnemyFast extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.sprite = 'images/enemy-bug-green.png';
    this.speed = Math.random() * 100 + 140;
  }

  update(dt) { super.update(dt); }
  render() { super.render(); }
}

class EnemySlow extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.sprite = 'images/enemy-bug-blue.png';
    this.speed = Math.random() * 40 + 10;
  }

  update(dt) { super.update(dt); }
  render() { super.render(); }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.x = 404;
    this.y = 560;
  }

  handleInput(key) {
    if (key === 'left' && this.x >= 101) {
      this.x = this.x - 101;
      if (rockCollide()) {
        this.x = this.x + 101;
      }
    }
    if (key === 'up' && this.y >= 0) {
      this.y = this.y - 83;
      if (rockCollide()) {
        this.y = this.y + 83;
      }
    }
    if (key === 'right' && this.x <= 707) {
      this.x = this.x + 101;
      if (rockCollide()) {
        this.x = this.x - 101;
      }
    }
    if (key === 'down' && this.y <= 477) {
      this.y = this.y +83;
      if (rockCollide()) {
        this.y = this.y - 83;
      }
    }
  }

  update() {

  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

//rock obstacles
class Rock {
  constructor(x, y) {
    this.sprite = 'images/rock.png';
    this.x = x;
    this.y = y;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// star pickup
class Star {
  constructor(x, y) {
    this.sprite = 'images/star.png';
    this.x = x;
    this.y = y;
    this.picked = false;
  }

  update() {
    if (!this.picked) {
      let diffY = player.y - star.y;
      let diffX = player.x - star.x;
      if (-60 < diffY && diffY < 60 && -50 < diffX && diffX < 70) {
        this.picked = true;
      }
    } else {
      this.x = player.x;
      this.y = player.y;
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// function to check if player not colliding with rock, used in player.handleInput()
function rockCollide() {
  for (rock of allRocks) {
    let diffY = player.y - rock.y;
    let diffX = player.x - rock.x;
    if (-60 < diffY && diffY < 60 && -50 < diffX && diffX < 70) {
      return true;
    }
  }
}

function checkCollisions() {
  for (enemy of allEnemies) {
    let diffY = player.y - enemy.y;
    let diffX = player.x - enemy.x;
    if (-60 < diffY && diffY < 60 && -50 < diffX && diffX < 70) {
      player.x = 404;
      player.y = 560;
      createStar();
    }
  }
}


// Now instantiate your objects.
var allRocks = [];
function spawnRocks() {
  for (let i = 0; i < 6; i++) {
    const randomRow = Math.floor(Math.random() * 6) * 83 + 57;
    const randomCol = Math.floor(Math.random() * 9) * 101;
    const newRock = new Rock(randomCol, randomRow);
    allRocks.push(newRock);
  }
}
spawnRocks();

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
function spawnEnemies() {
  const randomEnemy = Math.floor(Math.random() * 10);
  const randomLine = Math.floor(Math.random() * 6) * 83 + 57;
  let newEnemy;
  if (randomEnemy <= 5) {
    newEnemy = new Enemy(-101, randomLine);
  } else if (randomEnemy <= 8) {
    newEnemy = new EnemyFast(-101, randomLine);
  } else {
    newEnemy = new EnemySlow(-101, randomLine);
  }
  allEnemies.push(newEnemy);
}
var spawning = window.setInterval(spawnEnemies, 2000);

// Place the player object in a variable called player
var player = new Player();

var star;
function createStar() {
  const randomRow = Math.floor(Math.random() * 6) * 83 + 57;
  const randomCol = Math.floor(Math.random() * 9) * 101;
  star = new Star(randomCol, randomRow);
  for (rock of allRocks) {
    let diffY = star.y - rock.y;
    let diffX = star.x - rock.x;
    if (-60 < diffY && diffY < 60 && -50 < diffX && diffX < 70) {
      createStar();
    }
  }
}
createStar();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  console.log(allowedKeys[e.keyCode]);
  player.handleInput(allowedKeys[e.keyCode]);
});
