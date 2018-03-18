TEXT_ROOM_TEXTS = {
  '0': [
    "Claire:  I think we should both move on..",
    "Me:  But..",
    "Me:  I..",
    "Claire:  Bye.",
    "...",
    "[you're falling asleep]"
  ],
  '1': [
    "[you're falling asleep]"
  ],
  '2': [
    "[you're falling asleep]"
  ],
  '3_poem': [
    "The city has changed.",
    "Is it the gardens?",
    "Is it you?",
    "Another day",
    "without weight",
    "another day",
    "in my life.",
    "We promised",
    "to love each other",
    "till the next day comes.",
    "Tomorrow was only a myth that faded",
    "and we swore it'd never come.",
    "Yet it came",
    "and little too fast.",
    "Tomorrow",
    "is now."
  ],
  '3': [
    "The final sleep awaits you."
  ],
  '4': [
    "Claire:  I think we should both move on..",
    "Me:  I understand.",
    "Me:  Bye, Claire.",
    "[you're awake]",
    ""
  ]
};

TextRoom = function() {
  this.texts = [];

	this.background = game.add.graphics( 0, 0 );
	this.background.beginFill(BACKGROUND_COLOR, 1);
	this.background.bounds = new PIXI.Rectangle(0, 0, WIDTH, HEIGHT);
	this.background.drawRect(0, 0, WIDTH, HEIGHT);
	this.background.boundsPadding = 0;

  this.group = game.add.group();
  this.group.add(this.background);

  this.background.inputEnabled = true;
  this.background.input.useHandCursor = true;
  this.background.events.onInputDown.add(function() {
    tr.nextText();
  });

  this.group.visible = false;
  this.lock = false;
}

TextRoom.prototype.show = function(level, follow_function) {
  game.world.bringToTop(this.group);
  filter.up();

  this.group.visible = true;
  this.follow_function = follow_function;

  this.level = level;
  this.counter = 0;
  for(var i in tr.texts) {
    tr.texts[i].destroy();
  }
  this.texts = [];

  this.dead = false;
  this.lock = false;
  this.nextText();
}

var STORY_TEXT_SHIFT_DURATION = 350;
var STORY_TEXT_LOCK_DURATION = 400;
var STORY_TEXT_SPACE = 37;

TextRoom.prototype.nextText = function() {
  if(tr.lock || this.dead)
    return;
  if(tr.counter == TEXT_ROOM_TEXTS[tr.level].length) {
    this.dead = true;
    tr.follow_function();
  } else {
    for(var i in tr.texts) {
      game.add.tween(tr.texts[i]).to({ y: tr.texts[i].y - STORY_TEXT_SPACE }, STORY_TEXT_SHIFT_DURATION, Phaser.Easing.Sinusoidal.InOut, true, 0);
    }

    var text = createText(150, 500, TEXT_ROOM_TEXTS[tr.level][tr.counter], 'VT323', '24px', 'white');
    text.alpha = 0;
    game.add.tween(text).to({ alpha: 1}, STORY_TEXT_SHIFT_DURATION, Phaser.Easing.Sinusoidal.InOut, true, 0);

    tr.texts.push(text);
    tr.group.add(text);
    tr.counter++;

    tr.lock = true;
		game.time.events.add(STORY_TEXT_LOCK_DURATION, function() {
			tr.lock = false;
		}, this);
  }
}
