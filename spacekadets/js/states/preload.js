Preload.loadAsset = function(asset) {
    game.load.image(asset.name, asset.file);
}

Preload.loadAnimation = function(asset) {
    game.load.spritesheet(asset.name, asset.file, asset.width, asset.height, asset.frames);
} 

Preload.audio = function(asset) {
    game.load.audio(asset.name, asset.file);
}

Preload.preload = function() {
    var title = game.add.sprite(Game.width / 2, Game.height / 2, 'title');
    title.scale.setTo(10);
    title.anchor.setTo(0.5);
    
    Preload.loadingIcon = game.add.sprite(Game.width / 2, Game.height / 2 + 200, 'load');
    Preload.loadingIcon.scale.setTo(4);
    Preload.loadingIcon.anchor.setTo(0.5);
    
    Object.keys(People).forEach(function(asset) {
        Preload.loadingIcon.angle ++;
        Preload.loadAsset(People[asset]);
    });
    
    Object.keys(Assets).forEach(function(asset) {
        Preload.loadingIcon.angle ++;
        Preload.loadAsset(Assets[asset]);
    });
    Object.keys(Flasks).forEach(function(asset) {
        Preload.loadingIcon.angle ++;
        Preload.loadAnimation(Flasks[asset]);
    });
    
    Object.keys(Ships).forEach(function(asset) {
        Preload.loadingIcon.angle ++;
        Preload.loadAnimation(Ships[asset]);
    });
    
    Object.keys(Planets).forEach(function(asset) {
        Preload.loadingIcon.angle ++;
        Preload.loadAnimation(Planets[asset]);
    });
    
    Object.keys(Mothers).forEach(function(asset) {
        Preload.loadingIcon.angle ++;
        Preload.loadAnimation(Mothers[asset]);
    });
    
    Object.keys(Asteroids.a).forEach(function(asset) {
        Preload.loadingIcon.angle ++;
        Preload.loadAsset(Asteroids.a[asset]);
    });
    
    Object.keys(Asteroids.b).forEach(function(asset) {
        Preload.loadingIcon.angle ++;
        Preload.loadAsset(Asteroids.b[asset]);
    });
    
    Object.keys(Asteroids.c).forEach(function(asset) {
        Preload.loadingIcon.angle ++;
        Preload.loadAsset(Asteroids.c[asset]);
    });
    
    Object.keys(Asteroids.d).forEach(function(asset) {
        Preload.loadingIcon.angle ++;
        Preload.loadAsset(Asteroids.d[asset]);
    });
    
    Object.keys(Asteroids.e).forEach(function(asset) {
        Preload.loadingIcon.angle ++;
        Preload.loadAsset(Asteroids.e[asset]);
    });
    
    Object.keys(Asteroids.f).forEach(function(asset) {
        Preload.loadingIcon.angle ++;
        Preload.loadAsset(Asteroids.f[asset]);
    });
    
    Object.keys(Itms).forEach(function(asset) {
        Preload.loadingIcon.angle ++;
        Preload.loadAsset(Itms[asset]);
    });
    
    Object.keys(Sounds).forEach(function(asset) {
        Preload.loadingIcon.angle ++;
        Preload.audio(Sounds[asset]);
    });
    
    game.load.image('textBack', 'assets/static/textBack.png');
    game.load.image('box', 'assets/static/box.png');
    setInterval(function() {
        Preload.loadingIcon.angle ++;
    }, 2);
};

Preload.create = function() {
    reset = game.input.keyboard.addKey(Phaser.Keyboard.R);
    var jsonTut = localStorage.getItem("tut");
    if (jsonTut) {
        Game.tut = JSON.parse(jsonTut);
    } 
    else {
        Game.tut = true;
    }
    if(Game.tut) {
        Game.tut = true;
        Game.inv = [];
        localStorage.setItem("inv",  JSON.stringify(Game.inv));
        Game.email = 0;
        localStorage.setItem("email",  JSON.stringify(Game.email));
    }
    
    setTimeout(function() {
        if(reset.isDown) {
            Game.tut = true;
            Game.inv = [];
            localStorage.setItem("inv",  JSON.stringify(Game.inv));
            Game.email = 0;
            localStorage.setItem("email",  JSON.stringify(Game.email));
            console.log('Resetting!');
            game.state.start('Tut');
        }
        else if(Game.tut) {
            game.state.start('Tut');
        } else {
            game.state.start('Game');
        }
    }, 2000);
};