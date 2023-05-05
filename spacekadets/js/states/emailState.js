var EmailState = {};

EmailState.bodyStyle = {font: '30px Munro', fill: '#000', wordWrap: true, wordWrapWidth: 500};
EmailState.titleStyle = {font: '50px Munro', fill: '#000'};

EmailState.btnDisabled = 0x605e5e;

EmailState.btnEnabled = 0x00f43d;
EmailState.btnEnabledHover = 0x00b72d;

EmailState.getFields = function(input, field) {
    return input.map(function(o) {
        return o[field];
    });
}

EmailState.create = function() {
    var email = [];
    if(Game.tut) {
            email = Game.loadEmail(tutEmails[Tut.email]);
    } else {
            email = Game.loadEmail(Emails[Game.email]);
    }
    
    //Email
    game.add.tileSprite(10, 10, Game.width / 2 - 20, Game.height - 20, 'msgBack');
    game.add.tileSprite(15, 90, Game.width / 2 - 30, 2, 'textBack');
    game.add.text(30, 110, email[1], EmailState.bodyStyle);
    game.add.text(30, 20, "From: " + email[0], EmailState.titleStyle);
    
    //Required
    game.add.tileSprite(Game.width / 2, 10, Game.width / 2 - 10, Game.height / 2 - 20, 'msgBack');
    game.add.tileSprite(Game.width / 2 + 15, 90, Game.width / 2 - 30, 2, 'textBack');
    game.add.text(Game.width / 2 + 30, 20, "Required: ", EmailState.titleStyle);
    var required = email[3];
    var requiredText = "";
    
    
    for(e = 0; e < required.length; e++) {
        i = e;
        requiredText += (required[i].item.displayName + " " + required[i].amount + "x:\n    You Have " + Game.invContains(required[i].item, required[i].amount)[1] +".\n");
    }
    
    
    game.add.text(Game.width / 2 + 30, 100, requiredText, EmailState.bodyStyle);
    
    //Reward
    game.add.tileSprite(Game.width / 2, Game.height / 2, Game.width / 2 - 10, Game.height / 4, 'msgBack');
    game.add.tileSprite(Game.width / 2 + 15, Game.height / 2 + 90, Game.width / 2 - 30, 2, 'textBack');
    game.add.text(Game.width / 2 + 30, Game.height / 2 + 20, "Reward: ", EmailState.titleStyle);
    var reward = email[4];
    var rewardText = "";
    for(i = 0; i < reward.length; i++) {
        rewardText += (reward[i].item.displayName + " " + reward[i].amount + "x\n");
    }
    game.add.text(Game.width / 2 + 30, Game.height / 2 + 100, rewardText, EmailState.bodyStyle);
    
    
    //Give Items Button
    game.add.tileSprite(Game.width / 2, Game.height / 4 * 3 + 10, Game.width / 2 - 10, Game.height / 4 - 20, 'msgBack');
    var accept = game.add.tileSprite(Game.width / 2 + 10, (Game.height / 4 * 3) + 20, Game.width / 2 - 30, Game.height / 4 - 40, 'msgBack');
    
    var included = false;
    var found = 0;
    var maxFound = 0;
    
    email[3].forEach(function(i) {
        if(Game.invContains(i.item, i.amount)[0]) {
            found++;
        }
        maxFound++
    });
    included = found == maxFound;
    if(included) {
        accept.tint = EmailState.btnEnabled;
        accept.inputEnabled = true;
        
        accept.events.onInputDown.add(EmailState.tradeItem, this, 0, email);
    }
    else {
        accept.tint = EmailState.btnDisabled;
    }
    
    var acceptTextText = 'TRADE ITEMS';
    
    if(tutEmails[Tut.email].next == true && Game.tut == true) {
        acceptTextText = 'NEXT';
    }
    
    else if(Emails[Game.email.next == true]) {
        acceptTextText = 'NEXT';
    }
    
    var acceptText = game.add.text(0, 0, acceptTextText, {font: '90px Munro', fill: '#fff'});
    acceptText.anchor.setTo(0.5);
    acceptText.x = accept.x + accept.width / 2;
    acceptText.y = accept.y + accept.height / 2;
    
    var exit = game.add.sprite(Game.width - 40, 40, 'exit');
    exit.anchor.setTo(0.5);
    exit.scale.setTo(4);
    exit.alpha = 0.8;
    exit.inputEnabled = true;
    exit.events.onInputDown.add(function(){
        if(Game.tut) {
            game.state.start('Tut');
        } else {
            game.state.start('Game')
        }
    }, this, 0);
}

EmailState.update = function() {
    
}

EmailState.removeItems = function(item, amount) {
    for(i = 0; i < amount; i++) {
        Game.commands.removeItem(item);
    }
}

EmailState.addItems = function(item, amount) {
    for(i = 0; i < amount; i++) {
        Game.commands.addItem(item);
    }
}

EmailState.tradeItem = function(a, b, email) {
    
    EmailState.succesfull = game.add.audio('missionComplete');
    EmailState.succesfull.play();
    
    email[3].forEach(function(needed) {
        EmailState.removeItems(needed.item, needed.amount);
    });
    
    email[4].forEach(function(needed) {
        EmailState.addItems(needed.item, needed.amount);
    });
    
    console.log("Trading!");
    
    if(Game.email < Emails.length - 1 && Game.tut == false) {
        Game.email++;
        localStorage.setItem("email",  JSON.stringify(Game.email));
        console.log("Next Email");
        game.state.start('Email');
    } else if(Tut.email < tutEmails.length - 1 && Game.tut == true) {
        Tut.email++;
        if(Tut.email > 0) {
            Game.locked = [2, 3, 4, 5, 6];
        }
        console.log("Next Tut");
        game.state.start('Email');
    } else if(Game.email >= Emails.length - 1 && Game.tut == false) {
        Game.music.pause();
        console.log("Too The Credits");
        game.state.start('Credits');
    }
    
    else if(Tut.email >= tutEmails.length - 1 && Game.tut == true) {
        Game.tut = false;
        localStorage.setItem("tut",  JSON.stringify(Game.tut));
        Game.email = 0;
        localStorage.setItem("email",  JSON.stringify(Game.email));
        console.log("Starting Game");
        game.state.start('Game');
        
    } 
    else {
        game.state.start('Email');
    }
    
    
}