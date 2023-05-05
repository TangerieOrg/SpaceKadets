Credits.preload = function() {
    game.stage.backgroundColor = "000";
};

Credits.create = function() {
    Credits.text = game.add.text(100, Game.height, "Space Kadets\nA Game By Aeronautics Entered Into The Stem Games 2017 Competition\n\nGAME ENGINEER & CODER\nJoshua Cavill\n\nIMAGE DESIGNER & THEME INTEGRATOR\nMax Moors\n\nSTORYLINE MANAGER & EMAIL MAKER\nDaniel Rice\n\nMUSICIAN/GRAPHIC ARTIST\nWilliam Hickey\n\n\nAll Images And Music Were Made By 'Aeronautics' And Were Not Copied From Anywhere. The Aeronautics Team Claims All Rights To All Media Featured In This Game.\n\n\nLET THE GAME BEGIN!", {font: '40px Munro', fill: '#fff', wordWrap: true, wordWrapWidth: Game.width - 200});
    
    Credits.music = game.add.audio(Sounds.m.name);
    Credits.music.loop = true;
    Credits.music.play();
};

Credits.update = function() {
    Credits.text.y -= 2;
    if(Credits.text.y + Credits.text.height <= -50) {
        if(Game.tut) {
            Game.inv = [];
            localStorage.setItem("inv",  JSON.stringify(Game.inv));
            Game.email = 0;
            localStorage.setItem("email",  JSON.stringify(Game.email));
            Credits.music.stop();
            game.state.start('Tut');
        }
        else {
            Credits.music.stop();
            game.state.start('Game');
        }
    }
};