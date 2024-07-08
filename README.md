# JS-Usefuls
my hub of useful JS projects and functions for making life easier
## Using These Scripts
To use these scripts all you have to do is use the handy dandy `<script>` tags in your html files!
to use any of these you can paste any one of these to use that file's content:
#### 2 Dimensional Math:
`<script src="https://2muchblue.github.io/JS-Usefuls/Math2.js"></script>`
#### 3 Dimensional Math:
`<script src="https://2muchblue.github.io/JS-Usefuls/Math3.js"></script>`
#### Basic Boilerplate:
`<script src="https://2muchblue.github.io/JS-Usefuls/basics.js"></script>`

### Using basics.js
some extra things to be aware of when using this base is that the canvas id for drawing is assumed to be `mainCanvas`. ( represented as something like `<canvas id="mainCanvas"></canvas>` ) On top of that, the canvas drawing context is `2d` and the variable name is `ctx`. To make the update function work, you must define a function named `gameUpdate()`. This function runs every frame the browser allows (  via `requestAnimationFrame()`) and has no built-in pause or stop function. To start the `engineUpdate()` loop ( and in turn the `gameUpdate()` loop ) simply call `engineUpdate()` in whatever way you wish, I like to use something like this:
```javascript
document.addEventListener("click", clickToStartTrigger);

function clickToStartTrigger(){
	document.removeEventListener("click", clickToStartTrigger);
	engineUpdate();
}
```
This just makes it so you have to click the page to start the game.
