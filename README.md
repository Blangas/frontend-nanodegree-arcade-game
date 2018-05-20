frontend-nanodegree-arcade-game
===============================

To load the game, open index.html in your browser.

Press "Start Game!" button to start the game.

Move character with arrow keys.

Game goal is to collect a star to reveal finish gate on the water (it is possible to guess gate location) and then step on gate.

If player steps on water where is no gate he loses.

if player touches any beetle he loses.

Player can't walk trough rocks.

On lose player see how much times he finished a level and can start again by pressing "Play again?" button.

TODOs:
- check for rocks not to occupy the same position
- level progression
- creating a parent class GameEntity so that you won't have to define the render function more than once. You could also create two subclasses of GameEntity: MovingEntity and Static Entity and have Player and Enemy be subclasses of the MovingEntity class and Rock, Star, and Gate as subclasses of the StaticEntity class. (previous reviewer suggestion)
