StoryRoom = function(name, index) {
	this.name = name;
	this.items = [];
	this.arrows = [];
	this.group = game.add.group();
	this.sprite = createSprite(0, 0, 'rooms', 4, 4);
	this.sprite.frame = index;
	this.group.add(this.sprite);

	this.group.visible = false;
}
