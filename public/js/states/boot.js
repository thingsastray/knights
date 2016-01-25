

knights.Boot = function (){

};

knights.Boot.prototype.preload = function() {
	
	Object.keys(knights.ASSETS).forEach(function(type){
		for( var asset in knights.ASSETS[type]){
			knights.game.load[ type.toLowerCase ()](
				knights.ASSETS[type][asset].name,
				knights.ASSETS[type][asset].path,
				knights.ASSETS[type][asset].width,
				knights.ASSETS[type][asset].height,
				knights.ASSETS[type][asset].frames
			);
		}
	});
};

knights.Boot.prototype.create = function() {
	
	this.state.start(knights.STATES.GAME);

};