Boot = function() {}
Boot.prototype = {
	preload: function() {
		game.load.image('filter_paper', 'assets/filter_paper.png');
		game.load.image('title_loading', 'assets/title_loading.png');
		loadScript('etc/filter.js');
	},
	create: function() {
		game.state.start('preload');
	}
}

var SPLASH_DELAY = 2000;

Preload = function() { }
Preload.prototype = {
	preload: function() {
		createSprite(0, 100, 'title_loading', 2, 2);
//		createText(380, 20, 'loading', 'VT323', '20px', 'white');
		filter = new Filter(true); // filter for Boot scene
//		createText(195, 574, 'a game by @ViliX64', 'VT323', '20px', 'white');

		// assets
		game.load.spritesheet('rooms', 'assets/rooms.png', 200, 120);
		game.load.spritesheet('items_32x32', 'assets/items_32x32.png', 32, 32);
		game.load.spritesheet('items_32x16', 'assets/items_32x16.png', 32, 16);
		game.load.spritesheet('items_16x32', 'assets/items_16x32.png', 16, 32);
		game.load.spritesheet('items_16x16', 'assets/items_16x16.png', 16, 16);
		game.load.spritesheet('inventory', 'assets/inventory.png', 32, 32);
		game.load.spritesheet('stage_man', 'assets/stage_man.png', 32, 96);
		game.load.spritesheet('arrows', 'assets/arrows.png', 16, 16);
		game.load.image('paper_background', 'assets/paper_background.png');
		game.load.image('title_cover', 'assets/title_cover.png');

		game.load.audio('theme', 'assets/theme.ogg');		// will be added later on

		// scripts
		loadScript('game/story.js');
		loadScript('story_logic/room_manager_scene.js');
		loadScript('story_logic/text_room.js');
		loadScript('story_logic/story_room.js');
		loadScript('story_logic/story_item.js');
		loadScript('story_logic/arrow.js');
		loadScript('story_logic/text_display.js');
		loadScript('story_logic/paper_notifier.js');
		loadScript('story_logic/inventory.js');

		transitionOut(function() {});
	},

	create: function() {
    theme = game.add.audio('theme');
		theme.loopFull();
		game.time.events.add(SPLASH_DELAY, function() {
			transitionTo(function() {
				initStates();
			});
		}, this);
	}
}

function loadScript(path) {
	game.load.script(path, path);
}
