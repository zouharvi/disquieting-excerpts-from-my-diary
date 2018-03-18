Arrow = function(x, y, room, func, dir) {
	this.button = createButton(x, y, 'arrows', function() { if(!rms.transitioning) func(); }, this, dir, dir, dir);
  this.button.scale.setTo(5, 5);
  this.button.frame = dir;

	this.room = room;
	this.room.group.add(this.button);
	this.room.arrows.push(this);
}
