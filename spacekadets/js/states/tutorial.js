//Game(Universal) Varaibles / Functions
Game.inv = {
    boxes: {},
    items: []
};

Tut.email = 0;

Game.locked = [1, 2, 3, 4, 5, 6];

//[Itms., Itms., Itms.],
Game.recipie = [
    [Itms.electricity, Itms.copper, Itms.oxodisedCopper],
    [Itms.carbonFibre, Itms.ice, Itms.glass],
    [Itms.modernChip, Itms.spaceGas, Itms.unstableIon],
    [Itms.ion, Itms.lead, Itms.moltenRock],
    [Itms.gold, Itms.ice, Itms.gemstone],
    [Itms.neptonumC, Itms.neptonumC, Itms.antiMatter],
    [Itms.antiMatter, Itms.lead, Itms.darkMatter],
    [Itms.ion, Itms.neptonumC, Itms.unstableIon],
    [Itms.ancientChip, Itms.iron, Itms.modernChip],
    [Itms.ion, Itms.ion, Itms.electricity],
    [Itms.ancientChip, Itms.aluminium, Itms.ancientComputer],
    [Itms.glass, Itms.modernChip, Itms.modernComputer],
    [Itms.copper, Itms.copper, Itms.foolsGold],
    [Itms.electricity, Itms.glass, Itms.laserBeam],
    [Itms.cobalt, Itms.modernComputer, Itms.cobaltEngine],
    [Itms.plutonium, Itms.modernComputer, Itms.radEngine],
    [Itms.iron, Itms.iron, Itms.steel],
    [Itms.oxodisedCopper, Itms.ancientChip, Itms.rustBattery],
    [Itms.mercury, Itms.ancientChip, Itms.mercuryBattery],
    [Itms.ice, Itms.ice, Itms.marshmallow],
    [Itms.electricity, Itms.plutonium, Itms.ancientChip],
];

Tut.preload = function() {
    game.stage.backgroundColor = "A5A5A5";
};
Tut.create = function(){
    Tut.hPanels = game.add.group();
    
    if(Game.music == null) {
        Game.music = game.add.audio('menu');
        Game.music.loop = true;
        Game.music.play();
    }
    if(Game.music.paused) {
        Game.music.play();
        Game.music.paused = false;
    }
    
    //Setup Inventory
    var jsonInv = localStorage.getItem("inv");
    if (jsonInv) {
        Game.inv.items = JSON.parse(jsonInv);
    }
    
    Game.dragBoxes = game.add.group();
    tutPanel.inv(Tut.email);
    tutPanel.ship(Tut.email);
    tutPanel.inbox(Tut.email);
    tutPanel.reactor(Tut.email);
    tutPanel.levels(Tut.email);
    
    Game.check = setInterval(function() {
        Game.updateShip();
        if(Game.commands.getBoxData(Game.trash).mineral != null) {
            var min = Game.commands.getBoxData(Game.trash).mineral;
            Game.commands.removeItem(min.custom.obj);
            Game.clearBoxData(min.custom.data.box);
            min.kill();
        }   
    }, 500);
};

Tut.update = function() {
    game.world.bringToTop(Tut.hPanels);
};


//Panel Creation Functions
var tutPanel = {};

tutPanel.inv = function(email) {
    //X and Y for relative placement
    var rX = 0;
    var rY = 0;
    
    //Setup Inventory Section
    Game.inv.panel = Game.renders.panel(rX, rY, Game.width / 3, Game.height / 2, 'background');
    
    var locked = [0, 1];
    
    if(Game.includes(locked, email)) {
        var hPanel = Tut.hPanel(rX, rY, Game.width / 3, Game.height / 2);
    }
    
    Game.renders.inventory();
};

tutPanel.ship = function(email) {
    //X and Y for relative placement
    var rX = Game.width / 3 * 2;
    var rY = 0;
    Game.ship = {
        panel: Game.renders.panel(rX, rY, Game.width / 3, Game.height / 4 * 3, 'blueprint'),
        nose: Game.renders.dragBox(rX + 50, rY + 50),
        body: Game.renders.dragBox(rX + 50, rY + 200),
        thrust: Game.renders.dragBox(rX + 50, rY + 350),
        battery: game.add.sprite(rX + 200, rY + 25, 'batteryIcon'),
        shield: game.add.sprite(rX + 195, rY + 175, 'shield'),
        thruster: game.add.sprite(rX + 200, rY + 345, 'thruster'),
        statBox: game.add.tileSprite(rX + 30, rY + 450, Game.width / 3 - 60, 150, 'msgBack'),
        oldThrust: null,
        oldBody: null,
        oldNose: null,
        text: game.add.text(Game.width - 350, Game.height - 365, "Health: " + Game.health + " \nEnergy: " + Game.energy + " \nThrust: " + Game.thrust, Game.style),
    }
    
    var locked = [0, 1, 2];
    
    if(Game.includes(locked, email)) {
        var hPanel = Tut.hPanel(rX, rY, Game.width / 3, Game.height / 4 * 3);
    }
    
    Game.ship.shield.scale.setTo(4);
    Game.ship.battery.scale.setTo(4);
    Game.ship.thruster.scale.setTo(4);
    Game.ship.panel.tileScale.setTo(6);
    //text.resolution = 10;
    //Game.ship.text.scale.setTo(0.25);
    Game.ship.text.lineSpacing = 20;
};

tutPanel.inbox = function(email) {
    //X and Y for relative placement
    var rX = 0;
    var rY = Game.height / 2;
    
    var email = Game.loadEmail(tutEmails[Tut.email]);
    
    Game.inbox = {
        panel: Game.renders.panel(rX, rY, Game.width / 3, Game.height / 4, 'msgBack'),
        image: game.add.sprite(rX + 300, rY + 100, email[2]),
        email: game.add.sprite(rX + 40, rY + 20, 'emailIcon'),
        text: game.add.text(rX, rY + 140, email[0], {font: '30px Munro', fill: '#000'})
    }
    
    Game.inbox.panel.inputEnabled = true;
    Game.inbox.panel.events.onInputDown.add(function() {game.state.start('Email')}, this, 0);
    Game.inbox.image.scale.setTo(4.5);
    Game.inbox.image.anchor.setTo(0.5);
    
    Game.inbox.email.scale.setTo(4);
    
    Game.inbox.text.anchor.setTo(0.5);
    Game.inbox.text.x = Game.inbox.email.x + Game.inbox.email.width / 2;
};

tutPanel.reactor = function(email) {
    //X and Y for relative placement
    var rX = Game.width / 3;
    var rY = 0;
    
    Game.reactor = {
        panel: Game.renders.panel(rX, rY, Game.width / 3, Game.height / 4 * 3, 'reactorBack'),
        flask: Game.renders.animation(rX, rY + 200, Flasks.reactorFlask),
        itmA: Game.renders.dragBox(rX + 60, rY + 50),
        itmB: Game.renders.dragBox(rX + 250, rY + 50),
    }
    
    var locked = [0, 1];
    
    if(Game.includes(locked, email)) {
        var hPanel = Tut.hPanel(rX, rY, Game.width / 3, Game.height / 4 * 3);
    }
    
    Game.reactor.flask.scale.setTo(12);
    Game.reactor.flask.inputEnabled = true;
    
    Game.reactor.flask.events.onInputDown.add(Game.craft, this, 0, Game.reactor.itmA, Game.reactor.itmB);
};

tutPanel.levels = function(email) {
    //X and Y for relative placement
    var rX = 0;
    var rY = Game.height / 4 * 3;
    
    var ImgX = 18;
    var ImgS = 5;
    Game.reactor = {
        //Lvl Icons
        lvlImg: {
            a: Game.createLvl(rX + ImgX, rY + Game.height / 4 - 32 * ImgS, 'levelAImg', ImgS, 1),
            b: Game.createLvl(rX + ImgX + Game.width / 6, rY + Game.height / 4 - 32 * ImgS, 'levelBImg', ImgS, 2),
            c: Game.createLvl(rX + ImgX + Game.width / 6 * 2, rY + Game.height / 4 - 32 * ImgS, 'levelCImg', ImgS, 3),
            d: Game.createLvl(rX + ImgX + Game.width / 6 * 3, rY + Game.height / 4 - 32 * ImgS, 'levelDImg', ImgS, 4),
            e: Game.createLvl(rX + ImgX + Game.width / 6 * 4, rY + Game.height / 4 - 32 * ImgS, 'levelEImg', ImgS, 5),
            f: Game.createLvl(rX + ImgX + Game.width / 6 * 5, rY + Game.height / 4 - 32 * ImgS, 'levelFImg', ImgS, 6),
        }
    };
    
    var locked = [0];
    
    if(Game.includes(locked, email)) {
        var hPanel = Tut.hPanel(rX, rY, Game.width, Game.height / 4);
    }
};

Game.craft = function(a, b, itmA, itmB) {
    var mineralA = itmA.custom.data.mineral;
    var mineralB = itmB.custom.data.mineral;
    if(mineralA !== null && mineralB !== null) {
        Game.recipie.forEach(function(i) {
            console.log(i);
            if(mineralA.custom.obj.name == i[0].name && mineralB.custom.obj.name == i[1].name) {

                Game.commands.removeItem(i[0]);
                Game.commands.removeItem(i[1]);
                Game.commands.addItem(i[2]);

                Game.clearBoxData(mineralA.custom.data.box);
                Game.clearBoxData(mineralB.custom.data.box);
                mineralA.kill();
                mineralB.kill();
                delete mineralA;
                delete mineralB;

                Game.renders.mineral(Game.width / 3 + 165, 350, i[2]);
            } 
            else if (mineralA.custom.obj.name == i[1].name && mineralB.custom.obj.name == i[0].name) {

                Game.commands.removeItem(i[1]);
                Game.commands.removeItem(i[0]);
                Game.commands.addItem(i[2]);

                Game.clearBoxData(mineralA.custom.data.box);
                Game.clearBoxData(mineralB.custom.data.box);
                mineralA.kill();
                mineralB.kill();
                delete mineralA;
                delete mineralB;

                Game.renders.mineral(Game.width / 3 + 165, 350, i[2]);
            }
        });
    }
};

Game.updateShip = function() {
    var nose = Game.commands.getBoxData(Game.ship.nose);
    var body = Game.commands.getBoxData(Game.ship.body);
    var thrust = Game.commands.getBoxData(Game.ship.thrust);
    
    
    var health = 0, energy = 0, thrustDt = 0;
    var data = Game.checkShip(nose, body, thrust, health, energy, thrustDt);
    Game.ship.text.setText("Health: " + data[0] + " \nEnergy: " + data[1] + " \nThrust: " + data[2]);
}

Game.checkShip = function(nose, body, thrust, health, energy, thrustDt) {
    var marshmallow = false;
    if(nose.mineral != null) {
        var noseMin = nose.mineral.custom.obj;
        health += noseMin.health;
        thrustDt += noseMin.thrust;
        energy += noseMin.energy;
    }
    
    if(body.mineral != null) {
        var bodyMin = body.mineral.custom.obj;
        health += bodyMin.health;
        thrustDt += bodyMin.thrust;
        energy += bodyMin.energy;
    }
    
    if(thrust.mineral != null) {
        var thrustMin = thrust.mineral.custom.obj;
        health += thrustMin.health;
        thrustDt += thrustMin.thrust;
        energy += thrustMin.energy;
    }
    return [health + Game.health, energy + Game.energy, thrustDt + Game.thrust];
}

Tut.hPanel = function(x, y, xx, yy) {
    var panel = Game.renders.panel(x, y, xx, yy, 'msgBack');
    panel.alpha = 0.6;
    Tut.hPanels.add(panel);
}