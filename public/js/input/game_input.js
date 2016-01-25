
(function() {

  var BIND = {
    PLAYER : [
      // 0
      {
        JUMP : Phaser.KeyCode.W,
        DIVE : Phaser.KeyCode.S,
        LEFT : Phaser.KeyCode.A,
        RIGHT : Phaser.KeyCode.D
      }
    ],
    STATE : {
      CONTINUE : Phaser.KeyCode.ENTER,
    }
  };

  kickface.GameInput = function(state) {

    this.state = state;

    this.player_1_keys = this.state.game.input.keyboard.addKeys(BIND.PLAYER[0]);
    
    this.state_keys = this.state.game.input.keyboard.addKeys(BIND.STATE);

    // key up and down listeners
    this.player_1_keys.JUMP.onDown.add( this.state.player_1.jump.bind(this.state.player_1) );
    this.player_1_keys.DIVE.onDown.add( this.state.player_1.dive.bind(this.state.player_1) );
    this.player_1_keys.DIVE.onUp.add( this.state.player_1.dive_stop.bind(this.state.player_1) );
    this.player_1_keys.LEFT.onDown.add( this.state.player_1.step_left.bind(this.state.player_1) );
    this.player_1_keys.LEFT.onUp.add( this.state.player_1.stop.bind(this.state.player_1) );
    this.player_1_keys.RIGHT.onDown.add( this.state.player_1.step_right.bind(this.state.player_1) );
    this.player_1_keys.RIGHT.onUp.add( this.state.player_1.stop.bind(this.state.player_1) );

    this.state_keys.CONTINUE.onUp.add( this.state.continue.bind(this.state) );

  };

})();