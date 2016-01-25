(function () {

  // private static variables
  var ANIMATIONS = {
    IDLE : {
      name : 'idle',
      frames : [0,1,2,3],
      fps : 5
    },
    WALK : {
      name : 'walk',
      frames : [4,5],
      fps : 10
    },
    DEAD : {
      name : 'dead',
      frames : [8],
      fps : 1
    }
  };

  var FACING_FACTOR = {
    LEFT : -1,
    RIGHT : 1
  };

  var WALK_SPEED = 400;
  
  function select_sprite_row (player_id) {
    return function (frame_id) {
      return frame_id + player_id * kickface.ASSETS.SPRITESHEET.PLAYER.frames_per_row;
    };
  }

  // sprite class constructor
  // @id is 0 index based
  knights.Player = function (game, id, name) {
    this.game = game;
    this.id = id;
    this.name = name? name : 'Player ' + (id+1);
    this.facing; // direction that player is facing, state updates this

    // super constructor call
    Phaser.Sprite.call(this, game, 0, 0, knights.ASSETS.SPRITESHEET.PLAYER.name);

    // enable physics (adds this.body)
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // use stage bounding box
    this.body.collideWorldBounds = true;

    // set center registration point
    this.anchor = { x : 0.5, y : 0.5};

    this.animations.add(ANIMATIONS.IDLE.name, ANIMATIONS.IDLE.frames.map(select_sprite_row(this.id)));
    this.animations.add(ANIMATIONS.WALK.name, ANIMATIONS.WALK.frames.map(select_sprite_row(this.id)));
    this.animations.add(ANIMATIONS.DEAD.name, ANIMATIONS.DEAD.frames.map(select_sprite_row(this.id)));

    // play the initial animation
    this.animations.play(ANIMATIONS.IDLE.name, ANIMATIONS.IDLE.fps, true);
  };

  // extend Sprite prototype
  knights.Player.prototype = Object.create(Phaser.Sprite.prototype, {
    constructor: {
      value: knights.Player
    }
  });

  // public static variable
  knights.Player.FACING = {
    LEFT : 'LEFT',
    RIGHT : 'RIGHT'
  };

  // is invoked on every frame
  knights.Player.prototype.update = function () {

     // ignore acceleration(gravity) while diving
    if( this.is_diving ){
      this.body.acceleration.y = 0;
    }

    // update animations
    if(!this.alive){
      this.animations.play(ANIMATIONS.DEAD.name);
    }
  };

  // Input actions

  knights.Player.prototype.step_left = function ( ) {
  	if(!this.alive) return;
    this.body.velocity.x = -WALK_SPEED;
  };

  knights.Player.prototype.step_right = function ( ) {
  	if(!this.alive) return;
    this.body.velocity.x = WALK_SPEED;
  };

  // stop stepping left or right
  // on key up
  knights.Player.prototype.stop = function ( ) {
    this.body.velocity.x = 0;
  };

   // Custom methods

  knights.Player.prototype.defeat = function(){

    // stop all input
    this.alive = false;

  };

})();