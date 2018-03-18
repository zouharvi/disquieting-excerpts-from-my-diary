RoomManagerScene = function() {
	this.rooms = {};
	this.curRoom = null;
	rms = this;
	this.transitioning = false;
}

RoomManagerScene.prototype.addRoom = function(room, name) {
	this.rooms[room.name] = room;
	room.group.visible = false;
}

RoomManagerScene.prototype.goToRoom = function(name, transTo) {
	this.transitioning = true;
	if(typeof(transTo) != 'undefined' && transTo == true) {
		transitionTo(function() {
			rms.rooms[name].group.visible = true;
			if(rms.curRoom != null) {
				rms.curRoom.group.visible = false;
				if(typeof(rms.curRoom.items) != 'undefined')
					for(var i in rms.curRoom.items)
						rms.curRoom.items[i].inputOut();
			}
			rms.curRoom = rms.rooms[name];
			transitionOut(function() { rms.transitioning = false; });
		}, true);
	} else {
		rms.rooms[name].group.visible = true;
		if(rms.curRoom != null) {
			rms.curRoom.group.visible = false;
			if(typeof(rms.curRoom.items) != 'undefined')
				for(var i in rms.curRoom.items)
					rms.curRoom.items[i].inputOut();
		}
		rms.curRoom = rms.rooms[name];
		transitionOut(function() { rms.transitioning = false; });
	}
}

RoomManagerScene.prototype.goToText = function(name, follow_function, transTo) {
	this.transitioning = true;
	if(typeof(transTo) != 'undefined' && transTo == true) {
		transitionTo(function() {
			tr.show(name, follow_function);
			if(rms.curRoom != null) {
				rms.curRoom.group.visible = false;
				if(typeof(rms.curRoom.items) != 'undefined')
					for(var i in rms.curRoom.items)
						rms.curRoom.items[i].inputOut();
			}
			rms.curRoom = tr;
			transitionOut(function() { rms.transitioning = false; });
		}, true);
	} else {
		tr.show(name, follow_function);
		if(rms.curRoom != null) {
			rms.curRoom.group.visible = false;
			if(typeof(rms.curRoom.items) != 'undefined')
				for(var i in rms.curRoom.items)
					rms.curRoom.items[i].inputOut();
		}
		rms.curRoom = tr;
		transitionOut(function() { rms.transitioning = false; });
	}
}

RoomManagerScene.prototype.create = function() {
	game.stage.backgroundColor = BACKGROUND_COLOR;
	storyProgress = [{'Plato\'s Republic': false, 'Sun Tzu\'s The Art of War': false, 'Jean-Paul Sartre\'s Nausea': false , door_target: '0_door_1'},
		{safe_seq: '', progress: 0},
		{},
		{fuses: 0, elevator: 0, lock: true}
	];
	notifierNothing = null;
	filter = new Filter(false); // filter for RoomManagerScene scene
	tr = new TextRoom();
	inventory = new Inventory();
	story = new Story();
	paper = new Paper();
	filter.up();

	game.input.onDown.removeAll();
	game.input.onDown.add(function() {
		if(inventory.curItem != null)
			inventory.click();
	}, this);
}

RoomManagerScene.prototype.update = function() {
	if(inventory.curItem != null)
		inventory.mouseSprite.position.setTo(game.input.x-10, game.input.y-10);
}


RoomManagerScene.prototype.clearStory = function() {
	this.curRoom = null;
	for(r in this.rooms)
		this.rooms[r].group.destroy(true);
	this.rooms = [];
}
