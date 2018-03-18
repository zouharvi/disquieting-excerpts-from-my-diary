var PAPER_TRANSITION_DURATION = 200;

Paper = function() {
	this.sprite = createSprite(0, 0, 'paper_background', 4, 4);
	// inputEnabled = false would result in propagation to underlying objects
	this.sprite.inputEnabled = true;
	this.sprite.input.useHandCursor = true;
	this.text = createText(165, 220, "", 'VT323', '23px', 'white');
	this.text.wordWrap = true;
	this.text.wordWrapWidth = 500;

	this.group = game.add.group();
	this.group.add(this.sprite);
	this.group.add(this.text);
	this.group.alpha = 0;
	this.group.visible = false;


	this.sprite.events.onInputDown.add(function() {
		var tween = game.add.tween(paper.group);
		tween.to({alpha:0}, PAPER_TRANSITION_DURATION);
		tween.onComplete.add(function() {
			paper.group.visible = false;
		}, this);
		tween.start();
		if(paper.followup != null)
			paper.followup();
	});

}

Paper.prototype.show = function(text, followup) {
	this.text.setText(text);
	this.group.visible = true;
	var tween = game.add.tween(paper.group);
	tween.to({alpha:1}, PAPER_TRANSITION_DURATION);
	tween.onComplete.add(function() {	}, this);
	tween.start();

	if(typeof(followup) != 'undefined')
		this.followup = followup;
	else
		this.followup = null;
}

Notifier = function(text, duration) {
	this.text = createText(20, HEIGHT - 105, text, 'VT323', '24px', 'white');
	this.text.alpha = 0;
	rms.curRoom.group.add(this.text);


	game.time.events.add(50, function() {
		var tween = game.add.tween(this.text);
		tween.to({alpha:1}, ITEM_TEXT_HINT_TRANSITION);
		tween.start();
	}, this);


	game.time.events.add(duration, function() {
		var tween = game.add.tween(this.text);
		tween.to({alpha:0}, ITEM_TEXT_HINT_TRANSITION);
		tween.onComplete.add(function() { this.text.destroy(); }, this);
		tween.start();
	}, this);

	if(text == 'nothing happened')
		notifierNothing = this.text;
}
