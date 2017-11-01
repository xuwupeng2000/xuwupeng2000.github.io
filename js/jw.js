document.addEventListener("DOMContentLoaded", function(event) {
  var renderer = new PIXI.WebGLRenderer(256, 256);
  var Sprite = PIXI.Sprite;
  var resources = PIXI.loader.resources;
  var loader = PIXI.loader;
  var cat;
  var state;

  document.getElementById("pixi-stage")
    .appendChild(renderer.view);

  var stage = new PIXI.Container();

  loader.add("cat", "/images/cat.png").load(setup);

  function setup () {
    cat = new Sprite(resources["cat"].texture);
    cat.y = 96;
    cat.vx = 0;
    cat.vy = 0;

    stage.addChild(cat);

    setupKeyboard();
    gameLoop();
  }

  function gameLoop() {
    requestAnimationFrame(gameLoop);
    play();
    renderer.render(stage);
  }

  function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };

    key.upHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };

    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    );
    return key;
  }

    function play() {
      cat.x += cat.vx;
      cat.y += cat.vy
    }

  function setupKeyboard() {
    var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

    //Left arrow key `press` method
    left.press = function() {

      //Change the cat's velocity when the key is pressed
      cat.vx = -5;
      cat.vy = 0;
    };

    //Left arrow key `release` method
    left.release = function() {

      //If the left arrow has been released, and the right arrow isn't down,
      //and the cat isn't moving vertically:
      //Stop the cat
      if (!right.isDown && cat.vy === 0) {
        cat.vx = 0;
      }
    };

    //Up
    up.press = function() {
      cat.vy = -5;
      cat.vx = 0;
    };
    up.release = function() {
      if (!down.isDown && cat.vx === 0) {
        cat.vy = 0;
      }
    };

    //Right
    right.press = function() {
      cat.vx = 5;
      cat.vy = 0;
    };
    right.release = function() {
      if (!left.isDown && cat.vy === 0) {
        cat.vx = 0;
      }
    };

    //Down
    down.press = function() {
      cat.vy = 5;
      cat.vx = 0;
    };
    down.release = function() {
      if (!up.isDown && cat.vx === 0) {
        cat.vy = 0;
      }
    };
  }


});
