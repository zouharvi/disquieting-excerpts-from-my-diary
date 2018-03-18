Filter = function(tween) {
	this.sprite = createSprite(0, 0, 'filter_paper', 4, 4);
	if(tween) {
		this.sprite.alpha = 0;
		game.add.tween(this.sprite).to({ alpha: 1}, TRANSITION_DURATION, Phaser.Easing.Sinusoidal.InOut, true, 0);
	}
}

Filter.prototype.up = function(underline) {
	if(typeof(underline) != 'undefined')
		game.world.bringToTop(underline);
	if(typeof(inventory) != 'undefined')
		game.world.bringToTop(inventory.mouseSprite);
	game.world.bringToTop(this.sprite);
}
