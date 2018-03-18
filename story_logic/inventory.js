var ITEM_COMBINATIONS = {
  'blank papers+pen': [true, 'paper with notes', 6],
  'paper with notes+hand stamper': [true, 'notes with a stamp', 7],
  'planks+pack of nails': [true, 'planks with nails', 19],
  'planks with nails+hammer': [true, 'ladder', 20]
}

Inventory = function() {
  this.curItem = null;
  this.items = [];
  this.mouseSprite = createSprite(0, 0, 'inventory', 2, 2);
  this.mouseSprite.frame = 0;
  this.mouseSprite.visible = false;
  this.prevItem = null;
}

var ITEM_TRANSITION = 300;

Inventory.prototype.add = function(tag, sprite_frame) {
  var group = game.add.group();
  group.alpha = 0;

	var bg = game.add.graphics( 0, 0 );
	bg.beginFill(0xFFFFFF, 1);
  bg.bounds = new PIXI.Rectangle(0, 0, 68, 68);
	bg.drawRect(0, 0, 68, 68);
	bg.boundsPadding = 0;
  bg.alpha = 0.05;
  group.add(bg);

	var hintText = createText(20, HEIGHT - 65, tag, 'VT323', '24px', 'white');
	hintText.alpha = 0;
  group.add(hintText);

  var but = createButton(0, 0, 'inventory', function() { inventory.select(this.super.i); }, but, [sprite_frame, sprite_frame, sprite_frame]);
  but.scale.setTo(2, 2);
  but.frame = sprite_frame;
  this.items.push({background: bg, hintText: hintText, group: group, button: but, tag: tag, i: this.items.length, frame: sprite_frame});
  but.super = this.items[this.items.length-1];
  but.events.onInputOver.add(function() {
    	var tween = game.add.tween(this.hintText);
    	tween.to({alpha:1}, ITEM_TRANSITION);
    	tween.start();
   }, this.items[this.items.length-1]);
  but.events.onInputOut.add(function() {
    	var tween = game.add.tween(this.hintText);
    	tween.to({alpha:0}, ITEM_TRANSITION);
    	tween.start();
  }, this.items[this.items.length-1]);
  group.add(but);

	tween = game.add.tween(group);
	tween.to({alpha:1}, ITEM_TRANSITION);
	tween.start();

  this.arrange();
  filter.up(paper.group);
}

Inventory.prototype.remove = function(j) {
  var removed = false;
  for(var i = 0; i < this.items.length; i++) {
    this.items[i].i = i;
    if(this.items[i].i == j && !removed) {
      removed = true;
      var item = this.items[i];

      var tween = game.add.tween(item.group);
      tween.to({alpha:0}, ITEM_TRANSITION);
      tween.onComplete.add(function() {
        this.button.destroy();
        this.background.destroy();
        this.hintText.destroy();
        this.group.destroy();
      }, item);
      tween.start();

      if(this.items[i] == this.curItem)
        this.curItem = null;
      this.items.splice(i, 1);
      i--;
    }
  }
  this.arrange()
}

Inventory.prototype.removeByTag = function(tag) {
  for(var i = 0; i < this.items.length; i++) {
    this.items[i].i = i;
    if(this.items[i].tag == tag) {
      this.items[i].button.destroy();
      this.items[i].background.destroy();
      if(this.items[i] == this.curItem)
        this.curItem = null;
      this.items.splice(i, 1);
      i--;
    }
  }
  this.arrange()
}

Inventory.prototype.arrange = function() {
  for(var i in this.items) {
    this.items[i].background.x = 18 + i*75;
    this.items[i].background.y = 498;
    this.items[i].button.x = 20 + i*75;
    this.items[i].button.y = 500;
  }
}

Inventory.prototype.select = function(i) {
  if(this.prevItem != null) {
    if(typeof(ITEM_COMBINATIONS[this.prevItem.tag + '+' + this.items[i].tag]) !='undefined') {
      var comb = ITEM_COMBINATIONS[this.prevItem.tag + '+' + this.items[i].tag];
      this.add(comb[1], comb[2]);
      if(comb[0]) {
        this.remove(i);
        this.remove(this.prevItem.i);
      }
      this.isValid();
      return;
    } else if(typeof(ITEM_COMBINATIONS[this.items[i].tag + '+' + this.prevItem.tag]) !='undefined') {
      var comb = ITEM_COMBINATIONS[this.items[i].tag + '+' + this.prevItem.tag];
      this.add(comb[1], comb[2]);
      if(comb[0]) {
        this.remove(i);
        this.remove(this.prevItem.i);
      }
      this.isValid();
      return;
    }
  }
  // for crafting can do check what the curItem does in combination with the second one - table
  for(var j in this.items) {
    if(i != j)
      this.items[j].background.alpha = 0.05;
  }
  this.items[i].background.alpha = 0.2;
  this.curItem = this.items[i];
  this.mouseSprite.frame = this.items[i].frame;
  this.mouseSprite.visible = true;
}

Inventory.prototype.deselect = function () {
  for(var i in this.items)
    this.items[i].background.alpha = 0.05;
  this.mouseSprite.visible = false;
  this.prevItem = this.curItem;
  this.curItem = null;
	game.time.events.add(100, function() {
    this.prevItem = null;
	}, this);
}

Inventory.prototype.click = function() {
  if(!this.blockClick) {
    this.valid = false;
    game.time.events.add(50, function() {
      this.deselect();
      this.blockClick = false;
      // check if click resulted in something, if not 'nothing happened'
      if(!this.valid) {
        new Notifier('nothing happened', 1500);
      }
    }, this);
    this.blockClick = true;
  }
}

Inventory.prototype.isValid = function() {
  this.valid = true;
  if(notifierNothing != null) {
    notifierNothing.destroy();
    notifierNothing = null;
  }
}
