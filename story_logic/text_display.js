TextDisplay = function(texts, room, followup) {
  this.room = room;
  this.texts = texts;

	this.background = game.add.graphics( 0, 0 );
	this.background.beginFill(BACKGROUND_COLOR, 1);
	this.background.bounds = new PIXI.Rectangle(0, 0, WIDTH, HEIGHT);
	this.background.drawRect(0, 0, WIDTH, HEIGHT);
	this.background.boundsPadding = 0;
  this.background.alpha = 0.55;

  this.group = game.add.group();
  this.group.add(this.background);

  this.background.inputEnabled = true;
  this.background.input.useHandCursor = true;
  this.background.events.onInputDown.add(function() {
    this.nextText();
  }, this);

  this.room.group.add(this.group);

  this.lock = false;
  this.counter = 0;

  if(typeof(followup) != 'undefined')
    this.followup = followup;
  else
    this.followup = null;

  this.nextText();

}

TextDisplay.prototype.nextText = function() {
  if(this.lock)
    return;
  if(this.counter == this.texts.length) {
    var tween = game.add.tween(this.group);
    tween.to({alpha:0}, TRANSITION_DURATION);
    tween.onComplete.add(function() {
      this.group.destroy();
    }, this);
    tween.start();
    if(this.followup != null)
      this.followup();
  } else {
    this.prevText = this.curText;

    if(this.prevText != null) {
      var tween = game.add.tween(this.prevText);
      tween.to({alpha:0}, TRANSITION_DURATION);
      tween.onComplete.add(function() {
        this.prevText.destroy();
      }, this);
      tween.start();
    }

    this.curText = createText(150, 600, this.texts[this.counter], 'VT323', '24px', 'white');
    this.curText.alpha = 0;
    var tween = game.add.tween(this.curText);
    tween.to({alpha:1}, TRANSITION_DURATION);
    tween.start();

    this.group.add(this.curText);
    this.counter++;

    this.lock = true;
		game.time.events.add(STORY_TEXT_LOCK_DURATION, function() {
			this.lock = false;
		}, this);
  }
}
