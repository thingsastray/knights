// create a single global class

window.knights = {
	ASSETS: {},

	STAGE: {
		WIDTH: 900,
		HEIGHT: 600
	},

	STAGE_ID: 'game',

	STATES: {
		BOOT: 'Boot',
		GAME: 'Game'
	}
};

// Load Phaser on window load
window.onload = function (){
	knights.game = new Phaser.Game(knights.STAGE.WIDTH,
		knights.STAGE.HEIGHT, Phaser.AUTO, knights.STAGE_ID
		);
	knights.game.state.add(knights.STATES.BOOT, knights.Boot);
	knights.game.state.add(knights.STATES.GAME, knights.Game);
	knights.game.state.start(knights.STATES.BOOT);
};