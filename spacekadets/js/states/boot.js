Boot.init = function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.stage.disableVisibilityChange = true;
    //game.scale.pageAlignHorizontally = true;
    //game.scale.pageAlignVertically = true;
    //game.scale.windowConstraints.bottom = "visual";
    //game.scale.updateLayout(true);
};

Boot.preload = function() {
    game.stage.backgroundColor = "9f71ed";
    game.load.image('title', 'assets/static/title.png');
    game.load.image('load', 'assets/static/asteroid.png');
};

Boot.create = function() {
    Boot.loadFont = game.add.text(0, 0, 'Test', {font: '20px Munro', fill: '#000'});
    game.state.start("Preload");
};