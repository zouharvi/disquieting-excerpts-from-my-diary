StoryItem = function(x, y, spritesheet, scale, frame, hintTextData, room, callback) {
	this.sprite = createSprite(x, y, spritesheet, scale, scale);
	this.sprite.frame = frame;
	this.sprite.inputEnabled = true;
	this.sprite.events.onInputOver.add(this.inputOver, this);
	this.sprite.events.onInputOut.add(this.inputOut, this);
	this.room = room;
	this.room.group.add(this.sprite);
	this.room.items.push(this);
	this.callback = callback;

	this.hintText = createText(20, HEIGHT - 65, hintTextData, 'VT323', '24px', 'white');
	this.hintText.alpha = 0;
	this.room.group.add(this.hintText);

	if(this.callback != null) {
		this.sprite.input.useHandCursor = true;
		this.sprite.events.onInputDown.add(function() {
			this.callback(inventory.curItem);
		}, this);
	}
}

StoryItem.prototype.destroy = function() {
	this.sprite.inputEnabled = false;
	var tween = game.add.tween(this.sprite);
	tween.to({alpha:0}, ITEM_DESTROY_DURATION);
	tween.onComplete.add(function() {
		this.sprite.destroy(true);
	}, this);
	tween.start();

	var tween = game.add.tween(this.hintText);
	tween.to({alpha:0}, ITEM_DESTROY_DURATION);
	tween.onComplete.add(function() {
		this.hintText.destroy(true);
	}, this);
	tween.start();
}

var ITEM_DESTROY_DURATION = 200;
var ITEM_TEXT_HINT_TRANSITION = 300;

StoryItem.prototype.inputOver = function() {
	var tween = game.add.tween(this.hintText);
	tween.to({alpha:1}, ITEM_TEXT_HINT_TRANSITION);
//	tween.onComplete.add(function() {	}, this);
	tween.start();
}

StoryItem.prototype.inputOut = function() {
	var tween = game.add.tween(this.hintText);
	tween.to({alpha:0}, ITEM_TEXT_HINT_TRANSITION);
//	tween.onComplete.add(function() { }, this);
	tween.start();
}
