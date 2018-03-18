var WIDTH = 800, HEIGHT = 700;
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, "");

game.state.add('preload', Preload);
game.state.add('boot', Boot);

game.state.start('boot');

var filter;
var rms, tr;
var story, paper, inventory;
var storyProgress;
var notifierNothing;
var theme;

function initStates() {
	game.state.add('room_manager_scene', RoomManagerScene);
	game.state.start('room_manager_scene');
}
