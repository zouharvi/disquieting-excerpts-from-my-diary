function createSprite(x, y, name, scaleX, scaleY) {
	var sprite = game.add.sprite(x, y, name);
	sprite.scale.setTo(scaleX, scaleY);
	sprite.smoothed = false;
 	return sprite;
}

function createButton(x, y, name, func, context, s) {
	var button = game.add.button(x, y, name, func, context, s[0], s[1], s[2]);
 	button.smoothed = false;
 	return button;
}

function createText(x, y, text, font, size, color) {
	if (typeof(color) == typeof(undefined))
		color = 'black';
	var textObj = game.add.text(x, y, text, {font: (size + " " + font), fill: color});
	text.smoothed = false;
	return textObj;
}

var BACKGROUND_COLOR = 0x000000;
var TRANSITION_DURATION = 300;

function transitionTo(finish, destroy) {
	var sprite = game.add.graphics( 0, 0 );
	sprite.beginFill(BACKGROUND_COLOR, 1);
	sprite.bounds = new PIXI.Rectangle(0, 0, WIDTH, HEIGHT);
	sprite.drawRect(0, 0, WIDTH, HEIGHT);
	sprite.boundsPadding = 0;
	sprite.fixedToCamera = true;
	sprite.alpha = 0;

	var tween = game.add.tween(sprite);
	tween.to({alpha:1}, TRANSITION_DURATION);
	tween.onComplete.add(function() {
		if(typeof(destroy) != 'undefined' && destroy)
			sprite.destroy(true);
		finish();
	}, this);
	tween.start();

	if(typeof(filter) != 'undefined')
		filter.up();
}

function transitionOut(finish) {
	var sprite = game.add.graphics( 0, 0 );
	sprite.beginFill(BACKGROUND_COLOR, 1);
	sprite.bounds = new PIXI.Rectangle(0, 0, WIDTH, HEIGHT);
	sprite.drawRect(0, 0, WIDTH, HEIGHT);
	sprite.boundsPadding = 0;
	sprite.fixedToCamera = true;
	sprite.z = 1;

	var tween = game.add.tween(sprite);
	tween.to({alpha:0}, TRANSITION_DURATION);
	tween.onComplete.add(function() {
		sprite.destroy(true);
		finish();
	}, this);
	tween.start();

	if(typeof(filter) != 'undefined')
		filter.up();
}
