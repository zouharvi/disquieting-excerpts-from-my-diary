Story = function() {
	addFirstLocation();
	rms.goToText('0', function() { rms.goToRoom('0_hall_0', true); }, true)
}


function addFirstLocation() {
		// DESK_0
		var sr = new StoryRoom('0_desk_0', 0);
		new StoryItem(40, 165, 'items_32x32', 4, 1, 'philosophy tractate', sr, null);
		new StoryItem(120, 160, 'items_32x32', 4, 0, 'boring philosophy books', sr, null);
		new StoryItem(560, 90, 'items_32x32', 5, 2, 'wine', sr, null);
		new StoryItem(60, 280, 'items_32x16', 4, 0, 'blank papers', sr, function(item) {
			inventory.add('blank papers', 0);
			this.destroy();
		});
		new StoryItem(460, 280, 'items_16x16', 4, 0, 'a pen', sr, function(item) {
			inventory.add('pen', 1);
			this.destroy();
		});
		new StoryItem(340, 250, 'items_32x32', 4, 3, 'a note', sr, function(item) {
			paper.show("\"..he still believed that relationships could undergo several contradictory developments and still not break up. That's why when they said goodbye to each other he had a cheerful smile on his face while she was almost crying..\"");
			filter.up(paper.group);
		});
		new StoryItem(560, 290, 'items_32x32', 4, 4, 'Plato\'s Republic', sr, function(item) {
			inventory.add('Plato\'s Republic', 2);
			this.destroy();
		});
		new Arrow(350, 400, sr, function() { rms.goToRoom('0_door_0', true); }, 0);
		new Arrow(20, 360, sr, function() { rms.goToRoom('0_shelf_0', true); }, 2);
		rms.addRoom(sr);


		// SHELF_0
		sr = new StoryRoom('0_shelf_0', 2);
		new StoryItem(130, 210, 'items_32x32', 4, 5, 'Jean-Paul Sartre\'s Nausea', sr, function(item) {
			inventory.add('Jean-Paul Sartre\'s Nausea', 4);
			this.destroy();
		});
		new StoryItem(552, 36, 'items_32x32', 2, 8, 'modern French philosophy', sr, null);
		new StoryItem(616, 36, 'items_32x32', 2, 9, 'modern French philosophy', sr, null);
		new StoryItem(552, 128, 'items_32x32', 2,10, '', sr, null);
		new StoryItem(616, 128, 'items_32x32', 2,11, '', sr, null);
		new StoryItem(552, 220, 'items_32x32', 2,12, 'Greek philosophy', sr, null);
		new StoryItem(616, 220, 'items_32x32', 2,13, 'Greek philosophy', sr, null);
		new StoryItem(552, 308, 'items_32x32', 2,14, '', sr, null);
		new StoryItem(616, 308, 'items_32x32', 2,15, 'Kübler-Ross studies', sr, null);
		new StoryItem(552, 380, 'items_32x32', 2,10, 'Eastern philosophy', sr, null);
		new StoryItem(616, 380, 'items_32x32', 2,13, 'Eastern philosophy', sr, null);
		var emptySpaceFunc = function(item) {
			var indexes = {
				'Plato\'s Republic': 1,
				'Sun Tzu\'s The Art of War': 2,
				'Jean-Paul Sartre\'s Nausea': 3
			}
			if(this.full && item == null) {
				this.hintText.setText('empty space');
				this.sprite.frame = 0;
				this.full = false;
				inventory.add(this.text, indexes[this.text]+1);
				storyProgress[0][this.text] = false;
				this.text = 'empty space';
			} else if(!this.full && item != null) {
				if(Object.keys(indexes).indexOf(item.tag) != -1) {
					this.hintText.setText(item.tag);
					this.text = item.tag;
					this.sprite.frame = indexes[item.tag];
					this.full = true;
					inventory.remove(item.i);

					if(item.tag == this.key) {
						storyProgress[0][this.text] = true;
						var allFit = true;
						for(var k in indexes) {
							if(!storyProgress[0][k])
								allFit = false;
						}
						if(allFit) {
							rms.goToRoom('0_shelf_1', true);
							return;
						}
						new Notifier('fits perfectly', 1500);
					} else
						new Notifier('fits, but not perfectly next to the other books on the shelf', 2500)
				} else {
					new Notifier('doesn\'t fit', 1500);
				}
				inventory.isValid();
			}
		};
		(new StoryItem(576, 36, 'items_16x32', 2, 0, 'empty space', sr, emptySpaceFunc)).key = 'Jean-Paul Sartre\'s Nausea';
		(new StoryItem(654,220, 'items_16x32', 2, 0, 'empty space', sr, emptySpaceFunc)).key = 'Plato\'s Republic';
		(new StoryItem(590,380, 'items_16x32', 2, 0, 'empty space', sr, emptySpaceFunc)).key = 'Sun Tzu\'s The Art of War';
		new Arrow(680, 360, sr, function() { rms.goToRoom('0_desk_0', true); }, 3);
		rms.addRoom(sr);


		// SHELF_1
		sr = new StoryRoom('0_shelf_1', 3);
		new StoryItem(570, 196, 'items_16x16', 4, 1, 'hand stamper', sr, function(item) {
			inventory.add('hand stamper', 5);
			this.destroy();
		});
		new Arrow(680, 360, sr, function() { rms.goToRoom('0_desk_0', true); }, 3);
		rms.addRoom(sr);

		// DOOR_0
		sr = new StoryRoom('0_door_0', 1);
		new Arrow(320, 400, sr, function() { rms.goToRoom('0_desk_0', true); }, 1);
		new Arrow(380, 400, sr, function() { rms.goToRoom('0_hall_0', true); }, 0);
		rms.addRoom(sr);


		// HALL_0
		sr = new StoryRoom('0_hall_0', 4);
		new StoryItem(125, 80, 'items_16x32', 4, 4, 'Sun Tzu\'s The Art of War', sr, function(item) {
			inventory.add('Sun Tzu\'s The Art of War', 3);
			this.destroy();
		});
		new Arrow(600, 360, sr, function() { rms.goToRoom('0_door_0', true); }, 3);
		new Arrow(330, 390, sr, function() { rms.goToRoom(storyProgress[0]['door_target'], true); }, 1);
		rms.addRoom(sr);


		// DOOR_1
		sr = new StoryRoom('0_door_1', 6);
		new StoryItem(330, 132, 'stage_man', 4, 0, '', sr, function(item) {
			if(item == null)
				return;
			if(item.tag == 'blank papers')
				new Notifier('It has to have something written on it.', 1500);
			else if(item.tag == 'paper with notes')
				new Notifier('It has to have a stamp on it. Have you checked the library?', 2500)
			else if(item.tag == 'notes with a stamp') {
				rms.goToRoom('0_door_2', true);
				rms.rooms['0_hall_0'].sprite.frame = 5;
				storyProgress[0]['door_target'] = '0_door_2';
				inventory.remove(item.i);
			} else
				new Notifier('I don\'t require that.', 1500);
			inventory.isValid();
		});
		new Arrow(480, 400, sr, function() { rms.goToRoom('0_hall_0', true); }, 0);
		new TextDisplay(["I wont let you in unless you bring me a proof that\nI'm right about everything.", "It has to be written on a paper with na huge\nstamp on it."], sr);
		rms.addRoom(sr);


		// DOOR_2
		sr = new StoryRoom('0_door_2', 7);
		new Arrow(430, 400, sr, function() { rms.goToRoom('0_final_0', true); }, 1);
		new Arrow(490, 400, sr, function() { rms.goToRoom('0_hall_0', true); }, 0);
		rms.addRoom(sr);


		// FINAL_0
		sr = new StoryRoom('0_final_0', 8);
		new StoryItem(340, 250, 'items_32x32', 4, 6, 'a note', sr, function(item) {
			paper.show("Intellectual objectivism does not grant freedom to my heart, but now I see the world as it truly is.", function() {
				rms.goToText('1', function() {
					transitionTo(function() {
						rms.clearStory();
						tr.group.visible = false;
						addSecondLocation();
						rms.goToRoom('1_hall_0', false);
					});
				}, true)});
				filter.up(paper.group);
		});
		new Arrow(460, 400, sr, function() { rms.goToRoom('0_door_2', true); }, 0);
		rms.addRoom(sr);
}

function addSecondLocation() {
	// HALL_0
	sr = new StoryRoom('1_hall_0', 10);
	new Arrow(100, 360, sr, function() { rms.goToRoom('1_kitchen_0', true); }, 2);
	new Arrow(330, 390, sr, function() { rms.goToRoom('1_door_0', true); }, 0);
	new Arrow(390, 390, sr, function() { rms.goToRoom('1_door_1', true); }, 1);
	new Arrow(630, 360, sr, function() { rms.goToRoom('1_table_0', true); }, 3);
	rms.addRoom(sr);


	// DOOR_0
	sr = new StoryRoom('1_door_0', 11);
	new Arrow(330, 390, sr, function() { rms.goToRoom('1_hall_0', true); }, 0);
	new StoryItem(375, 205, 'items_16x16', 4, 11, 'lock', sr, function(item) {
		if(item == null)
			new Notifier('it\'s locked', 1500);
		else if(item.tag == 'key') {
			new Notifier('key fits', 1500);
			this.inputEnabled = false;
			inventory.remove(item.i);
			new Arrow(390, 390, storyProgress[1]['door_0'], function() { rms.goToRoom('1_blank_0', true); }, 1);
		} else
			new Notifier('doesn\'t quite fit', 1500);
		inventory.isValid();
	});
	storyProgress[1]['door_0'] = sr;
	rms.addRoom(sr);


	// DOOR_1
	sr = new StoryRoom('1_door_1', 9);
	new StoryItem(245, 90, 'stage_man', 4, 1, '', sr, function(item) {
		if(item == null)
			new Notifier('I said I wanted 6 things to break! You brought ' + storyProgress[1]['progress'], 1500);
		else if(['mug', 'plate', 'glass', 'glass flowerpot'].indexOf(item.tag) != -1) {
			inventory.remove(item.i);
			storyProgress[1]['progress'] ++;
			if(storyProgress[1]['progress'] < 6)
				new Notifier('More!', 1000);
			else {
				rms.goToRoom('1_door_2', true);
			}
		} else
			new Notifier('That\'s not suitable for breaking', 1500);

		inventory.isValid();
	});
	new StoryItem(565, 165, 'items_16x32', 4, 5, '', sr, function(item) {	inventory.add('glass flowerpot', 8); this.destroy(); });
	new Arrow(330, 390, sr, function() { rms.goToRoom('1_hall_0', true); }, 0);
	new TextDisplay(["I'm angry!", "Bring me 6 things to break."], sr);
	rms.addRoom(sr);


	// DOOR_2
	sr = new StoryRoom('1_door_2', 9);
	new StoryItem(445, 90, 'stage_man', 4, 1, '', sr, function(item) {	});
	new Arrow(390, 390, sr, function() { rms.goToRoom('1_final_0', true); }, 1);
	rms.addRoom(sr);


	// TABLE_0
	sr = new StoryRoom('1_table_0', 12);
	new StoryItem(265, 215, 'items_16x16', 4, 2, '', sr, function(item) {	inventory.add('screwdriver', 10); this.destroy(); });
	new StoryItem(340, 240, 'items_32x32', 4, 3, 'a note', sr, function(item) {
		// 1914, 450, 1789, 1517
		paper.show("code:\n1. Capybara\n2. Bear\n3. Deer\n4. Alpaca");
		filter.up(paper.group);
	});
	storyProgress[1]['safe_0'] = new StoryItem(610, 130, 'items_32x32', 6, 7, 'safe', sr, function(item) { rms.goToRoom('1_safe_0', true); });
	storyProgress[1]['safe_1'] = new StoryItem(446, 130, 'items_32x32', 6,16, '', sr, null );
	storyProgress[1]['safe_2'] = new StoryItem(610, 130, 'items_32x32', 6,17, '', sr, null );
	storyProgress[1]['mug'] = new StoryItem(670, 240, 'items_16x16', 4, 8, 'mug', sr, function(item) { this.destroy(); inventory.add('mug', 11); } );
	storyProgress[1]['glass'] = new StoryItem(725, 245, 'items_16x16', 4, 9, 'glass', sr, function(item) { this.destroy(); inventory.add('glass', 12); });
	storyProgress[1]['safe_1'].sprite.visible = storyProgress[1]['safe_2'].sprite.visible = storyProgress[1]['mug'].sprite.visible = storyProgress[1]['glass'].sprite.visible = false;
	new Arrow(330, 390, sr, function() { rms.goToRoom('1_hall_0', true); }, 0);
	rms.addRoom(sr);


	// KITCHEN_0
	sr = new StoryRoom('1_kitchen_0', 13);
	new StoryItem(665, 205, 'items_32x32', 4,18, 'sink', sr, function(item) {
		if(item != null) {
			if(item.tag == 'screwdriver') {
				this.foundKey = true;
				new Notifier('you found a key', 1500);
				inventory.add('key', 14);
				inventory.remove(item.i);
			} else
				new Notifier('that wouldn\'t work', 1500);
		} else {
			if(typeof(this.foundKey) == 'undefined' || !this.foundKey) {
				this.foundKey = false;
				new Notifier('something\'s stuck in the drain', 1500);
			}
		}
		inventory.isValid();
	 });
 	new StoryItem(368, 284, 'items_32x32', 4,19, 'kitchenware shelf', sr, function(item) {
		this.destroy();
		new StoryItem(400, 310, 'items_16x16', 4,10, 'plate', storyProgress[1]['kitchen_0'], function(item) { inventory.add('plate', 13); this.destroy(); });
		new StoryItem(270, 286, 'items_32x32', 4,20, '', storyProgress[1]['kitchen_0'], null);
	});
	new Arrow(330, 390, sr, function() { rms.goToRoom('1_hall_0', true); }, 0);
	new Arrow(630, 360, sr, function() { rms.goToRoom('1_kitchen_1', true); }, 3);
	storyProgress[1]['kitchen_0'] = sr;
	rms.addRoom(sr);


	// KITCHEN_1
	sr = new StoryRoom('1_kitchen_1', 14);
	new StoryItem(465, 115, 'items_16x32', 4, 6, '', sr, function(item) {	inventory.add('glass flowerpot', 9); this.destroy(); });
	new Arrow(100, 360, sr, function() { rms.goToRoom('1_kitchen_0', true); }, 2);
	rms.addRoom(sr);


	// SAFE_1
	sr = new StoryRoom('1_safe_0', 17);

	function safeAdd(n) {
		if(storyProgress[1]['safe_seq'].length == 4)
		safeFlush();
		storyProgress[1]['safe_seq'] += n;
		if(storyProgress[1]['safe_seq'].length == 4) {
			if(storyProgress[1]['safe_seq'] == '3241') {
				storyProgress[1]['safe_0'].sprite.visible = false;
				storyProgress[1]['safe_1'].sprite.visible = true;
				storyProgress[1]['safe_2'].sprite.visible = true;
				storyProgress[1]['mug'].sprite.visible = true;
				storyProgress[1]['glass'].sprite.visible = true;
				rms.goToRoom('1_table_0', true);
			}
		}
		safeRender();
	}

	function safeFlush() {
		storyProgress[1]['safe_seq'] = '';
		safeRender();
	}

	function safeRender() {
		var str = storyProgress[1]['safe_seq'];
		var arr = storyProgress[1]['safe_texts'];
		for(a in arr) {
			if(a < str.length)
			arr[a].setText(str[a]);
			else
			arr[a].setText('');
		}
	}
	var arr = [];
	arr.push(createText(165,170, '', 'VT323', '128px', 'black'));
	arr.push(createText(285,170, '', 'VT323', '128px', 'black'));
	arr.push(createText(405,170, '', 'VT323', '128px', 'black'));
	arr.push(createText(525,170, '', 'VT323', '128px', 'black'));
	storyProgress[1]['safe_texts'] = arr;
	for(a in arr)
		sr.group.add(arr[a]);
	new StoryItem(160, 360, 'items_16x16', 4, 3, '', sr, function(item) {	safeAdd('1'); });
	new StoryItem(280, 360, 'items_16x16', 4, 4, '', sr, function(item) {	safeAdd('2'); });
	new StoryItem(400, 360, 'items_16x16', 4, 5, '', sr, function(item) {	safeAdd('3'); });
	new StoryItem(520, 360, 'items_16x16', 4, 6, '', sr, function(item) {	safeAdd('4'); });
	new StoryItem(640, 360, 'items_16x16', 4, 7, '', sr, function(item) { safeFlush(); });
	new Arrow(30, 400, sr, function() { rms.goToRoom('1_table_0', true); }, 0);
	rms.addRoom(sr);


	// BLANK_0
	sr = new StoryRoom('1_blank_0', 16);
	new StoryItem(135, 135, 'items_16x16', 4, 9, 'glass', sr, function(item) { this.destroy(); inventory.add('glass', 12); });
	new Arrow(330, 360, sr, function() { rms.goToRoom('1_hall_0', true); }, 0);
	rms.addRoom(sr);


	// FINAL_0
	sr = new StoryRoom('1_final_0', 15);
	new Arrow(330, 360, sr, function() { rms.goToRoom('1_door_2', true); }, 0);
	new StoryItem(390, 230, 'items_32x32', 2, 6, 'a note', sr, function(item) {
		paper.show("This is the end of my anger. I feel much calmer now.\n\nTrust si such a fragile thing: it's hard to build and yet easy to lose.\nI'm sorry for what I did. Perhaps we could negotiate.", function() {
			tr.group.visible = true;
			rms.goToText('2', function() {
				transitionTo(function() {
					rms.clearStory();
					tr.group.visible = false;
					addThirdLocation();
					rms.goToRoom('2_hall_0', false);
				});
			}, true)});
			filter.up(paper.group);
	});
	rms.addRoom(sr);
}

function addThirdLocation() {
		// HALL_0
		sr = new StoryRoom('2_hall_0', 18);
		new Arrow(100, 360, sr, function() { rms.goToRoom('2_window_0', true); }, 2);
		new Arrow(340, 390, sr, function() { rms.goToRoom('2_door_0', true); }, 1);
		new Arrow(580, 360, sr, function() { rms.goToRoom('2_hole_0', true); }, 3);
		rms.addRoom(sr);


		// WINDOW_0
		sr = new StoryRoom('2_window_0', 23);
		new StoryItem(465, 90, 'stage_man', 4, 3, '', sr, function(item) {
			if(item == null || item.tag != 'a poem')
				new Notifier('A poem would be nice.', 1500);
			else {
				new Notifier('Thank you - it\'s a lovely poem.', 1500);
				inventory.remove(item.i);
				new Arrow(390, 390, storyProgress[2]['window_0'], function() { rms.goToRoom('2_window_1', true); }, 1);
			}
			inventory.isValid();
		});
		new StoryItem(165,390, 'items_16x16', 4, 12, 'pack of nails', sr, function(item) { this.destroy(); inventory.add('pack of nails', 15); });
		new Arrow(330, 390, sr, function() { rms.goToRoom('2_hall_0', true); }, 0);
		new TextDisplay(["Did you notice that there are no exits?\nWindow is the only way out.", "I'd like to read some poetry before I let you go."], sr);
		storyProgress[2]['window_0'] = sr;
		rms.addRoom(sr);


		// WINDOW_1
		sr = new StoryRoom('2_window_1', 25);
		new StoryItem(160, 432, 'items_32x16', 3, 2, 'a note', sr, function(item) {
			paper.show("Turns out Orwell was right - ignorance is strength.\nYou can't hurt more in a relationship than to ignore the struggles of the other..");
			filter.up(paper.group);
		});
		new Arrow(320, 390, sr, function() { rms.goToRoom('2_window_0', true); }, 0);
		new Arrow(390, 390, sr, function() {
	//		tr.group.visible = true;
			rms.goToText('3', function() {
				transitionTo(function() {
					rms.clearStory();
					tr.group.visible = false;
					addFourthLocation();
					rms.goToRoom('3_elevator_0', false);
				});
			}, true)
		}, 1);
		rms.addRoom(sr);


		// DOOR_0
		sr = new StoryRoom('2_door_0', 24);
		new StoryItem(187, 343, 'items_32x32', 2, 6, 'a note', sr, function(item) {
			paper.show("It's a pity that you only become aware of happiness once you've lost it.");
			filter.up(paper.group);
		});
		new Arrow(100, 390, sr, function() { rms.goToRoom('2_wood_0', true); }, 2);
		new Arrow(390, 390, sr, function() { rms.goToRoom('2_hall_0', true); }, 0);
		new Arrow(320, 390, sr, function() { rms.goToRoom('2_table_0', true); }, 1);
		rms.addRoom(sr);


		// HOLE_0
		sr = new StoryRoom('2_hole_0', 20);
		new StoryItem(485, 60, 'stage_man', 4, 2, '', sr, function(item) {
			if(item == null)
				new Notifier('Bring me the apple and I\'ll give you the poem', 1500);
			else if(item.tag == 'golden apple') {
				inventory.remove(item.i);
				var td = new TextDisplay(["This .. - this is all we are.\nDoing anything for some arbitrary goal.", "Anyway, here's that poem."], rms.curRoom, function() {
					STORY_TEXT_SPACE = 30;
					rms.goToText('3_poem', function() {
						STORY_TEXT_SPACE = 37;
						rms.goToRoom('2_hole_0', true);
					}, true);
				});
				td.group.alpha = 0;
		    var tween = game.add.tween(td.group);
		    tween.to({alpha:1}, 150);
				tween.start();

				inventory.add('a poem', 22);
			} else
				new Notifier('I want an apple, not this.', 1500);
			inventory.isValid();
		});
		new StoryItem(315,310, 'items_32x32', 4, 21, 'hole', sr, function(item) {
			if(item == null)
				new Notifier('You can\'t just jump in. How would you get out?', 2000);
			else if(item.tag == 'ladder') {
				this.destroy();
				inventory.remove(item.i);
				new StoryItem(315,310, 'items_32x32', 4, 22, 'hole', storyProgress[2]['hole_room'], function(item) { rms.goToRoom('2_hole_1', true); });
			} else {
				new Notifier('That wouldn\'t work.', 1500);
			}
			inventory.isValid();
		});
		new Arrow(220, 390, sr, function() { rms.goToRoom('2_hall_0', true); }, 0);
		new TextDisplay(["I threw my apple in this hole and forgot\nthat I actually still want it.", "If you bring me the apple,\nI'll give you a poem in exchange."], sr);
		storyProgress[2]['hole_room'] = sr;
		rms.addRoom(sr);


		// HOLE_1
		sr = new StoryRoom('2_hole_1', 21);
		new StoryItem(185, 425, 'items_16x16', 4, 15, '', sr, function(item) {	this.destroy(); inventory.add('golden apple', 21); });
		new StoryItem(370, 420, 'items_32x32', 2, 6, 'a note', sr, function(item) {
			paper.show("The apple of desire.\nI remember part of me dying here.");
			filter.up(paper.group);
		});
		new Arrow(290, 390, sr, function() { rms.goToRoom('2_hole_0', true); }, 1);
		rms.addRoom(sr);


		// TABLE_0
		sr = new StoryRoom('2_table_0', 22);
		new StoryItem(165, 220, 'items_16x16', 5, 13, 'hammer', sr, function(item) { this.destroy(); inventory.add('hammer', 16); });
		new StoryItem(405, 240, 'items_16x16', 5, 14, 'handsaw', sr, function(item) { this.destroy(); inventory.add('handsaw', 17); });
		new Arrow(350, 390, sr, function() { rms.goToRoom('2_door_0', true); }, 0);
		rms.addRoom(sr);


		// WOOD_0
		sr = new StoryRoom('2_wood_0', 19);
		var plankFunc = function(item) {
			if(item == null)
				new Notifier('You have to use something to cut it.', 1900);
			else if(item.tag == 'handsaw') {
				storyProgress[2]['plank_0'].destroy();
				storyProgress[2]['plank_1'].destroy();
				inventory.remove(item.i);
				inventory.add('planks', 18);
			} else {
				new Notifier('That wouldn\'t work.', 1500);
			}
			inventory.isValid();
		}
		storyProgress[2]['plank_0'] = new StoryItem(120, 288, 'items_32x16', 5, 1, 'plank', sr, plankFunc);
		storyProgress[2]['plank_0'].sprite.scale.setTo(10, 5);
		storyProgress[2]['plank_1'] = new StoryItem(325, 330, 'items_32x16', 5, 1, 'plank', sr, plankFunc);
		storyProgress[2]['plank_1'].sprite.scale.setTo(10, 5);
		new Arrow(350, 390, sr, function() { rms.goToRoom('2_door_0', true); }, 0);
		rms.addRoom(sr);
}

function addFourthLocation() {
		// ELEVATOR_0
		sr = new StoryRoom('3_elevator_0', 26);
		new StoryItem(110, 210, 'items_32x32', 4, 23, 'control panel', sr, function(item) { rms.goToRoom('3_elevator_panel_0', true); });
		new Arrow(340, 390, sr, function() { rms.goToRoom('3_hall_0', true); }, 1);
		rms.addRoom(sr);


		// ELEVATOR_1
		sr = new StoryRoom('3_elevator_1', 33);
		new StoryItem(110, 210, 'items_32x32', 4, 23, 'control panel', sr, function(item) { rms.goToRoom('3_elevator_panel_0', true); });
		new Arrow(340, 390, sr, function() { rms.goToRoom('3_hall_3', true); }, 1);
		rms.addRoom(sr);


		// ELEVATOR_PANEL_0
		sr = new StoryRoom('3_elevator_panel_0', 34);
		var fusesLock = function() {
			new Notifier('The power is down or the elevator is locked.', 2000);
		}
		new StoryItem(220, 280, 'items_16x16', 2, 25, 'floor 1', sr, function(item) {
			if(storyProgress[3]['fuses'] == 4 && !storyProgress[3]['lock']) {
				if(storyProgress[3]['elevator'] == 1)
					new Notifier('You\'re already on floor 1.', 1500);
				else {
					rms.goToRoom('3_elevator_1', true);
					storyProgress[3]['elevator'] = 1;
				}
			} else
				fusesLock();
		});
		new StoryItem(220, 346, 'items_16x16', 2, 25, 'floor 1', sr, function(item) {
			if(storyProgress[3]['fuses'] == 4 && !storyProgress[3]['lock']) {
				if(storyProgress[3]['elevator'] == 0)
					new Notifier('You\'re already on floor 0.', 1500);
				else {
					rms.goToRoom('3_elevator_0', true);
					storyProgress[3]['elevator'] = 0;
				}
			} else
				fusesLock();
			inventory.isValid();
		});
		new Arrow(340, 390, sr, function() { if(storyProgress[3]['elevator'] == 0) rms.goToRoom('3_elevator_0', true); else rms.goToRoom('3_elevator_1'); }, 0);
		rms.addRoom(sr);


		// HALL_0
		sr = new StoryRoom('3_hall_0', 27);
		new Arrow(320, 390, sr, function() { rms.goToRoom('3_hall_1', true); }, 1);
		new Arrow(390, 390, sr, function() { rms.goToRoom('3_elevator_0', true); }, 0);
		rms.addRoom(sr);


		// HALL_1
		sr = new StoryRoom('3_hall_1', 28);
		new Arrow(120, 390, sr, function() { rms.goToRoom('3_table_0', true); }, 2);
		new Arrow(320, 390, sr, function() { rms.goToRoom('3_hall_2', true); }, 1);
		new Arrow(390, 390, sr, function() { rms.goToRoom('3_hall_0', true); }, 0);
		new Arrow(540, 390, sr, function() { rms.goToRoom('3_door_0', true); }, 3);
		rms.addRoom(sr);


		// HALL_2
		sr = new StoryRoom('3_hall_2', 29);
		new StoryItem(340, 194, 'items_32x32', 2, 3, 'a note', sr, function(item) {
			paper.show("We turn our eyes to heavens and the heavens are empty.");
			filter.up(paper.group);
		});
		new Arrow(320, 390, sr, function() { rms.goToRoom('3_box_0', true); }, 1);
		new Arrow(390, 390, sr, function() { rms.goToRoom('3_hall_1', true); }, 0);
		rms.addRoom(sr);


		// HALL_3
		sr = new StoryRoom('3_hall_3', 36);
		new StoryItem(485, 60, 'stage_man', 4, 4, '', sr, null);
		new TextDisplay(["Here we are. Denial, anger, bargaining, depression.. acceptance.\nIt's been a lot, but it was inevitable.",
			"Eventually all your mental projections will disappear and\nyou'll feel nothing but a slight sadness.",
			"Sleep well."
		], sr);
		new Arrow(320, 390, sr, function() { rms.goToRoom('3_bed_0', true); }, 1);
		new Arrow(390, 390, sr, function() { rms.goToRoom('3_elevator_1', true); }, 0);
		rms.addRoom(sr);


		// BED_0
		sr = new StoryRoom('3_bed_0', 35);
		new StoryItem(540, 350, 'items_32x32', 3, 3, 'a note', sr, function(item) {
			paper.show("Reproducible things are of no value - that is their nature. Hence only love that has ended is the only and true fulfilled love.");
			filter.up(paper.group);
		});
		new Arrow(320, 390, sr, function() { rms.goToText('4', function() {
			transitionTo(function() {
				rms.clearStory();
				var but = createButton(0, 100, 'title_cover', function() {
					transitionTo(function() {
						initStates();
					});
				}, this, [0, 0, 0]);
				but.scale.setTo(2, 2);
				tr.group.visible = false;
				transitionOut(function() {});
			});
		}, true); }, 1);
		new Arrow(390, 390, sr, function() { rms.goToRoom('3_hall_3', true); }, 0);
		rms.addRoom(sr);


		// BOX_0
		sr = new StoryRoom('3_box_0', 31);
		var fuseSpaceFunc = function(item) {
			if(this.done)
				return;
			if(item == null)
				new Notifier('A fuse is required.', 1500);
			else if(item.tag == 'fuse') {
				inventory.remove(item.i);
				this.done = true;
				this.sprite.frame = 20;
				this.hintText.setText('fuse');
				this.inputEnabled = false;
				storyProgress[3]['fuses'] += 1;
				new Notifier('fits', 1000);
			} else
				new Notifier('Doesn\'t fit.', 1500);
			inventory.isValid();
		};
		new StoryItem(360, 210, 'items_16x16', 4, 17, 'fuse space', sr, fuseSpaceFunc);
		new StoryItem(460, 210, 'items_16x16', 4, 17, 'fuse space', sr, fuseSpaceFunc);
		new StoryItem(360, 260, 'items_16x16', 4, 17, 'fuse space', sr, fuseSpaceFunc);
		new StoryItem(460, 260, 'items_16x16', 4, 17, 'fuse space', sr, fuseSpaceFunc);
		new StoryItem(665, 180, 'items_16x16', 4, 16, 'fuse', sr, function(item) { this.destroy(); inventory.add('fuse', 23); });
		new Arrow(120, 390, sr, function() { rms.goToRoom('3_box_1', true); }, 2);
		new Arrow(390, 390, sr, function() { rms.goToRoom('3_hall_2', true); }, 0);
		rms.addRoom(sr);


		// BOX_1
		sr = new StoryRoom('3_box_1', 32);
		var refreshButtons = function() {
			for(var i = 0; i < 4; i++)
				if(storyProgress[3]['button_'+i].on)
					storyProgress[3]['button_'+i].sprite.frame = 21;
				else
					storyProgress[3]['button_'+i].sprite.frame = 22;

			storyProgress[3]['indicator_0'].sprite.frame = (!storyProgress[3]['button_0'].on)?23:24;
			storyProgress[3]['indicator_1'].sprite.frame = (storyProgress[3]['button_0'].on || !storyProgress[3]['button_1'].on)?23:24;
			storyProgress[3]['indicator_2'].sprite.frame = ( (!storyProgress[3]['button_1'].on && (storyProgress[3]['button_2'].on && !storyProgress[3]['button_3'].on)) )?23:24;
			storyProgress[3]['lock'] = !( (!storyProgress[3]['button_0'].on) && (storyProgress[3]['button_0'].on || !storyProgress[3]['button_1'].on) && (!storyProgress[3]['button_1'].on && (storyProgress[3]['button_2'].on && !storyProgress[3]['button_3'].on)) );
		};
		storyProgress[3]['button_0'] = new StoryItem(283, 150, 'items_16x16', 2, 21, 'button', sr, function(item) { this.on = !this.on; refreshButtons(); });
		storyProgress[3]['button_1'] = new StoryItem(283, 210, 'items_16x16', 2, 21, 'button', sr, function(item) { this.on = !this.on; refreshButtons(); });
		storyProgress[3]['button_2'] = new StoryItem(283, 255, 'items_16x16', 2, 21, 'button', sr, function(item) { this.on = !this.on; refreshButtons(); });
		storyProgress[3]['button_3'] = new StoryItem(283, 300, 'items_16x16', 2, 21, 'button', sr, function(item) { this.on = !this.on; refreshButtons(); });

		storyProgress[3]['indicator_0'] = new StoryItem(456, 154, 'items_16x16', 2, 23, '', sr, null);
		storyProgress[3]['indicator_1'] = new StoryItem(456, 192, 'items_16x16', 2, 23, '', sr, null);
		storyProgress[3]['indicator_2'] = new StoryItem(456, 259, 'items_16x16', 2, 23, '', sr, null);

		storyProgress[3]['button_0'].on = storyProgress[3]['button_2'].on = storyProgress[3]['button_3'].on = true;
		storyProgress[3]['button_2'].on = false;

		refreshButtons();
		new StoryItem(495, 50, 'items_16x16', 5, 16, 'fuse', sr, function(item) { this.destroy(); inventory.add('fuse', 23); });
		new Arrow(450, 390, sr, function() { rms.goToRoom('3_box_0', true); }, 3);
		rms.addRoom(sr);


		// TABLE_0
		sr = new StoryRoom('3_table_0', 30);
		new StoryItem(165, 210, 'items_16x16', 4, 18, 'fuse', sr, function(item) { this.destroy(); inventory.add('fuse', 23); });
		new StoryItem(525, 410, 'items_16x16', 4, 19, 'key', sr, function(item) { this.destroy(); inventory.add('key', 14); });
		new Arrow(350, 390, sr, function() { rms.goToRoom('3_hall_1', true); }, 0);
		rms.addRoom(sr);


		// TABLE_1
		sr = new StoryRoom('3_table_1', 38);
		new StoryItem(300, 310, 'items_16x16', 4, 18, 'fuse', sr, function(item) { this.destroy(); inventory.add('fuse', 23); });
		new Arrow(350, 390, sr, function() { rms.goToRoom('3_hall_1', true); }, 0);
		rms.addRoom(sr);


		// DOOR_0
		sr = new StoryRoom('3_door_0', 37);
		new StoryItem(375, 205, 'items_16x16', 4, 11, 'lock', sr, function(item) {
			if(item == null)
				new Notifier('it\'s locked', 1500);
			else if(item.tag == 'key') {
				new Notifier('key fits', 1500);
				this.inputEnabled = false;
				inventory.remove(item.i);
				new Arrow(390, 390, storyProgress[3]['door_0'], function() { rms.goToRoom('3_table_1', true); }, 1);
			} else
				new Notifier('doesn\'t quite fit', 1500);
			inventory.isValid();
		});
		new Arrow(320, 390, sr, function() { rms.goToRoom('3_hall_1', true); }, 0);
		storyProgress[3]['door_0'] = sr;
		rms.addRoom(sr);
}
