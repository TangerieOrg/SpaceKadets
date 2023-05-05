Space.width = Game.width + 1000;
Space.height = Game.height + 1000;

Space.spawnChances = 4;

Space.asteroid = [
    ['asteroidADefault', 'asteroidAHoles', 'asteroidAJungle', 'asteroidARock', 'rock'], 
    ['asteroidADefault', 'asteroidARock', 'rock'], 
    ['asteroidADefault', 'asteroidARock', 'rock', 'asteroidCGem', 'asteroidCCrack'], 
    ['asteroidADefault', 'asteroidARock', 'rock', 'asteroidDGem'], 
    ['asteroidADefault', 'asteroidARock', 'rock', 'asteroidEA', 'asteroidEB'],
    ['asteroidADefault', 'asteroidARock', 'rock', 'asteroidFA']
];

Space.backgrounds = ['aBack', 'bBack', 'cBack', 'dBack', 'eBack', 'fBack'];

Space.planets = [Planets.planetA, Planets.planetB, Planets.planetC, Planets.planetD, Planets.planetE, Planets.planetF];

Space.backMusic = [Sounds.a, Sounds.b, Sounds.c, Sounds.d, Sounds.e, Sounds.f];

Space.sounds = {}

Space.create = function() {
    
    Game.collided = false;
    
    if(Game.email >= 35) {
        Space.ship = Ships.f;
        Space.mother = Mothers.ef;
    }
    else if(Game.email >= 21) {
        Space.ship = Ships.e;
        Space.mother = Mothers.ef;
    }
    else if(Game.email >= 16) {
        Space.ship = Ships.d;
        Space.mother = Mothers.d;
    }
    else if(Game.email >= 11) {
        Space.ship = Ships.c;
        Space.mother = Mothers.c;
    }
    else if(Game.email >= 6) {
        Space.ship = Ships.b;
        Space.mother = Mothers.b;
    }
    else if(Game.email >= 0) {
        Space.ship = Ships.a;
        Space.mother = Mothers.a;
    }
    
    if(Space.sounds.collide == null) {
        Space.sounds.collide = game.add.audio('collide');
    }
    
    Space.ended = false;
    Space.collected = [];
    game.world.setBounds(0, 0, Space.width, Space.height);
    
    Space.background = game.add.tileSprite(0, 0, Space.width, Space.height, Space.backgrounds[Space.level - 1]);
    Space.background.tileScale.setTo(4);
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    if(Rocket.marshmallow == true) {
        console.log("Activating Marshmallow Mode!");
        Space.ship = Ships.m;
        Space.mother = Mothers.m;
        Space.music = game.add.audio(Sounds.m.name);
        
    } else {
        Space.music = game.add.audio(Space.backMusic[Space.level - 1].name);
    }
    Space.music.loop = true;
    Space.music.play();
    
    Space.rocket = Game.renders.animation(-100, -100, Space.ship);
    Space.rocket.alpha = 0;
    Space.rocket.anchor.set(0.5);
    Space.rocket.scale.setTo(3);

    game.physics.enable(Space.rocket, Phaser.Physics.ARCADE);

    Space.rocket.body.drag.set(150);
    Space.rocket.body.maxVelocity.set(300 + Rocket.thrust * 2);
    Space.rocket.body.collideWorldBounds = true;
    Space.rocket.body.bounce.setTo(0.5, 0.5);
    Space.rocket.health = Rocket.health;
    
    if(Rocket.marshmallow) {
        Space.rocket.body.bounce.setTo(1.1, 1.1);
    }
    
    Space.motherShp = game.add.sprite(Game.width, 100, Space.mother.name);
    Space.motherDrop = Space.motherShp.animations.add('drop');
    Space.motherDrop.killOnComplete = true;
    Space.motherDrop.onComplete.add(function() {
        Space.motherShp.kill();
        Space.rocket.x = 230;
        Space.rocket.y = 336;
        Space.rocket.alpha = 1;
    });
    Space.motherShpTween = game.add.tween(Space.motherShp);
    Space.motherShpTween.to({ x: 50 }, 1000, 'Linear', true, 0);
    Space.motherShpTween.onComplete.add(function() {
        Space.motherShp.animations.play('drop', Space.mother.frameRate, false);
    }, this);
    Space.motherShp.scale.setTo(4);
    
    Space.cursors = game.input.keyboard.createCursorKeys();
    
    Space.genAsteroids();
    Space.genMaterials();
    
    Space.healthBar = game.add.tileSprite(10, 10, Space.rocket.health * 10, 32, 'health');
    Space.healthBar.fixedToCamera = true;
    Space.healthBar.tileScale.setTo(4);
    
    Space.rocket.battery = Rocket.battery;
    
    Space.batteryBar = game.add.tileSprite(10, 52, Space.rocket.battery / 10, 32, 'battery');
    Space.batteryBar.fixedToCamera = true;
    Space.batteryBar.tileScale.setTo(4);
    
    game.camera.follow(Space.rocket);
    clearInterval(Space.check);
    Space.check = setInterval(function() {
        if(Space.rocket.battery > 0 && Space.rocket.health > 0){
            Space.battery(Space.rocket);
        }
    }, 20);
    
    var exit = game.add.sprite(Game.width - 40, 40, 'exit');
    exit.anchor.setTo(0.5);
    exit.scale.setTo(4);
    exit.alpha = 0.8;
    exit.inputEnabled = true;
    exit.events.onInputDown.add(function(){
        Space.music.pause();
        if(Game.tut) {
            game.state.start('Tut');
        } else {
            game.state.start('Game');
        }
    }, this, 0);
    exit.fixedToCamera = true;
    Space.pointB();
}

Space.update = function() {

    if(Space.cursors.up.isDown && Space.rocket.health > 0 && Space.rocket.battery > 0 && Rocket.thrust > 0) {
        game.physics.arcade.accelerationFromRotation(Space.rocket.rotation, 200 + Rocket.thrust * 2, Space.rocket.body.acceleration);
    }
    
    else {
        Space.rocket.body.acceleration.set(0);
    }
    
    
    
    if (Space.cursors.left.isDown) {
        if(Space.rocket.health > 0 && Space.rocket.battery > 0) {
            Space.rocket.body.angularVelocity = -250;
        }
    }
    
    else if(Space.cursors.right.isDown) {
        if(Space.rocket.health > 0 && Space.rocket.battery > 0){
            Space.rocket.body.angularVelocity = 250;
        }
    } 
    
    else {
        if(Space.rocket.body.angularVelocity > 0) {
            Space.rocket.body.angularVelocity -= 10;
        } 
        else if(Space.rocket.body.angularVelocity < 0) {
            Space.rocket.body.angularVelocity += 10;
        }
    }
    
    if(Space.rocket.battery <= 0 || Space.rocket.health <= 0 && Space.ended == false) {
        Space.endGame();
    }
    //Collisions
    game.physics.arcade.collide(Space.rocket, Space.asteroids, Space.collide, null, Space.rocket);
    game.physics.arcade.collide(Space.asteroids, Space.asteroids, function(){
        Space.sounds.collide.play()
    });
    game.physics.arcade.overlap(Space.materials, Space.rocket, Space.collectItem, null, this);
    
    game.physics.arcade.overlap(Space.rocket, Space.pointBs, Space.endGame, null, this);
    
    while(game.physics.arcade.overlap(Space.asteroids, Space.asteroids)) {
        game.physics.arcade.overlap(Space.asteroids, Space.asteroids, Space.killAsteroid, null, this);
    }
    
}

Space.genAsteroids = function() {
    Space.asteroids = game.add.group();
    for(i = 0; i < Game.randRange(Space.minAsteroids, Space.maxAsteroids); i++) {
        var x = Game.randRange(350, Space.width - 50);
        var y = Game.randRange(350, Space.height - 50);
        var asteroid = Space.asteroids.create(x, y, Space.asteroid[Space.level - 1][Game.randRange(0, Space.asteroid[Space.level - 1].length - 1)]);
        asteroid.anchor.setTo(0.5);
        var scale = Game.randRange(2,8);
        asteroid.scale.setTo(scale);

        game.physics.enable(asteroid, Phaser.Physics.ARCADE);

        asteroid.body.drag.set(50 * scale);
        asteroid.body.collideWorldBounds = true;
        if(Rocket.marshmallow) {
            asteroid.body.bounce.setTo(1.1, 1.1);
        } else {
            asteroid.body.bounce.setTo(0.9, 0.9);
        }
    }
    
    while(game.physics.arcade.overlap(Space.asteroids, Space.asteroids)) {
        game.physics.arcade.overlap(Space.asteroids, Space.asteroids, Space.killAsteroid, null, this);
    }
}

Space.genMaterials = function() {
    Space.materials = game.add.group();
    Object.keys(Itms).forEach(function(asset) {
        if(Itms[asset].rarity > 0 && Game.includes(Itms[asset].area, Space.level)) { 
            for(i = 0; i < Space.spawnChances * Space.level; i++) {
                if(Game.randRange(1, Itms[asset].rarity) == 1) {
                    var x = Game.randRange(150, Space.width - 50);
                    var y = Game.randRange(150, Space.height - 50);
                    var material = Space.materials.create(x, y, Itms[asset].name);
                    material.obj = Itms[asset];
                    material.anchor.setTo(0.5);
                    material.scale.setTo(3);
                    game.physics.enable(material, Phaser.Physics.ARCADE);
                }
            }
        }
    });
}

Space.collide = function(rocket) {
    Space.sounds.collide.play();
    if(Game.collided == false) {
        Space.health(rocket);
        Game.collided == true;
        setTimeout(function() {
            Game.collided = false;
        }, 500)
    }
}

Space.health = function(rocket) {
    rocket.health -= 1;
    Space.healthBar.width = rocket.health * 10
}

Space.battery = function(rocket) {
    rocket.battery -=1;
    Space.batteryBar.width = rocket.battery / 10;
}

Space.killAsteroid = function(asteroid) {
    asteroid.kill();
}

Space.collectItem = function(rocket, item) {
    Space.collected.push(item.obj);
    //Game.commands.addItem(item.obj);
    item.kill();
}

Space.endGame = function() {
    if(Space.ended != true && Space.rocket.health > 0 && Space.rocket.battery > 0) {
        console.log("Game Ended!");
        Space.ended = true;
        Space.scroll("Well Done Kadet! You Collected:");
        var x = 180;
        var y = 400;
        var dX = x;
        var dY = y;
        var menuMinerals = game.add.group();
        if(Space.collected == null) {
            Space.collected = [];
        }
        Space.collected.forEach(function(item) {
            var min = menuMinerals.create(dX, dY, item.name);
            min.scale.setTo(4);
            if(dX + x < Game.width - 200) {
                dX += 128;
            } else {
                dX = x;
                dY += 128;
            }
            Game.commands.addItem(item);
        });
        menuMinerals.fixedToCamera = true;
        clearInterval(Space.check);
        console.log(Space.check);
        setTimeout(function() {
            Space.music.pause();
            if(Game.tut) {
                game.state.start('Tut');
            } else {
            game.state.start("Game");
            }
        }, 3000);
    } 
    else if(Space.ended != true) {
        
        console.log("Game Ended!");
        Space.ended = true;
        Space.motherShpDead = game.add.sprite(0, 0, 'motherDead');
        Space.motherShpDead.scale.setTo(4);
        Space.motherShpTweenDead = game.add.tween(Space.motherShpDead);
        Space.motherShpTweenDead.to({ x: Space.rocket.x, y: Space.rocket.y }, 1000, 'Linear', true, 0);
        clearInterval(Space.check);
        console.log(Space.check);
        setTimeout(function() {
            Space.scroll("Unlucky Kadet, You Could Not Reach The Planet.\nYour Mothership Has Collected You From Space.");
            
            setTimeout(function() {
                
                Space.music.pause();
                if(Game.tut) {
                    game.state.start('Tut');
                } else {
                game.state.start("Game");
                }
            }, 3000);
        }, 800);
    }
}

Space.pointB = function() {
    Space.pointBs = Game.renders.animation(Space.width - 120, Space.height - 100, Space.planets[Space.level - 1]);
    Space.pointBs.anchor.setTo(0.5);
    Space.pointBs.scale.setTo(8);
    game.physics.enable(Space.pointBs, Phaser.Physics.ARCADE);
}

Space.scroll = function(text) {
    var menu = game.add.sprite(50, 50, 'scroll');
    menu.scale.setTo(31);
    menu.fixedToCamera = true;
    menu.inputEnabled = true;
    var menuText = game.add.text(180, 350, text, {font: '50px Munro', fill: '#000', align: "center", wordWrap: true, wordWrapWidth: 860});
    var title = game.add.sprite(Game.width / 2, 200, 'title');
    title.anchor.setTo(0.5);
    title.scale.setTo(8);
    title.fixedToCamera = true;
    menuText.fixedToCamera = true;
    game.world.bringToTop(menuText);
}