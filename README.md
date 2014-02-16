# JSTetris - the pure JavaScript Tetris clone

## Description
I created this game to test how usable my JavaScript knowledge already is. Also I wanted to test the HTML5 canvas element and I read that it is usually manipulated with JavaScript.

There are two versions: one has a keyboards control and is meant for desktop or laptop computers and the other one has touch control. The touch control is tightly connected to the drawing routine as this game uses a virtual control. Any similarities to your old Nintendo Gameboy are purely coincidental ... *cough*.

Please notice that the project uses the MVC architecture as much as possible (having virtual gamecontrols is causing a few problems though, mixing the rendering with the touchcontrols).

## How to use it
There are two html files showing the use for a normal desktop/laptop or for a mobile device. The main differences lie in the load of the control routines and event handlers as well as the rendering routines, as the touch screen controls are tightly knit with the rendering routine. 

Additionally the touch screen version needed a few style changes like `display:block`, which if omitted would cause problems when setting the width and height of the canvas to the full viewport extents.

## Controls
### Touchscreen
Use the virtual cursor field to move the tile about and press "A" or "B" to either rotate the tile counterclockwise or clockwise respectively.

### Keyboard
Use "A" or "D" to either rotate the tile counterclockwise or clockwise respectively. You can move the tile using the arrow keys left, right or down. For convenience the upwards arrow key has the same function as "A" so you can play the game single handedly.

## Running versions
http://martinsenk.net/Tetris/tetris.html

http://martinsenk.net/Tetris/tetris-mobile.html

## TODO List
- highscore list
- BG music
- keep the aspect ratio of the squares
- tweak the touch input
- if game is over and resize events occurs the game isn't redrawn anymore ->change that
- change the difficulty to get harder faster but don't be too hard to play at level 13 already

## Credits
I'd like to mention here the source I used as a base for my game loops. It can be found here:

http://www.koonsolo.com/news/dewitters-gameloop/

Instead of sending the gameloop to sleep I use a timeout event to run another loop in JavaScript.
