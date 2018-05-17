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
    this.speed = 100;
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
    if (key === 'left' && this.x >= 101) {this.x = this.x - 101;}
    if (key === 'up' && this.y >= 0) {this.y = this.y - 83;}
    if (key === 'right' && this.x <= 707) {this.x = this.x + 101;}
    if (key === 'down' && this.y <= 477) {this.y = this.y +83;}
  }

  update() {

  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

function checkCollisions() {
  for (enemy of allEnemies) {
    let diffY = player.y - enemy.y;
    let diffX = player.x - enemy.x;
    if (-60 < diffY && diffY < 60 && -50 < diffX && diffX < 70) {
      player.x = 404;
      player.y = 560;
    }
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
function spawnEnemies() {
  const line = Math.floor(Math.random() * 6) * 83 + 57;
  const newEnemy = new Enemy(-101, line);
  allEnemies.push(newEnemy);
}
var spawning = window.setInterval(spawnEnemies, 2000);
// Place the player object in a variable called player
var player = new Player();


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
