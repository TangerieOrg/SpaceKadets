Game.renders = {
    mineral: function (x, y, mineralObj, amount) {

        if (amount == null) {
            amount = 1;
        }

        //Make mineral
        var mineral = game.add.sprite(x, y, mineralObj.name);
        mineral.z = 10;
        mineral.scale.setTo(Game.mineralScale);
        mineral.custom = {
            data: {
                box: null,
                oldBox: null
            }
        };

        //Add input events
        mineral.inputEnabled = true;
        mineral.events.onInputOver.add(Game.mineralOver, mineral);
        mineral.events.onInputOut.add(Game.mineralOut, mineral);
        mineral.events.onInputDown.add(Game.mineralDown, mineral);
        mineral.events.onInputUp.add(Game.mineralUp, mineral);
        mineral.input.enableDrag(true);
        mineral.custom.obj = mineralObj;

        //Add text variables
        var textXPos = 50 * Game.mineralScale;
        var textYPos = -30 * Game.mineralScale;
        var padding = 5;

        //Add text group
        mineral.custom.text = game.add.group();
        mineral.custom.text.visible = false;
        mineral.custom.text.scale.setTo(1 / Game.mineralScale);

        //Add ship and material atrributes
        var rarity, rarityColour, health, healthColour, thrust, thrustColour, energy, energyColour;
        if (mineralObj.rarity >= 200) {
            rarity = "Ultra Rare";
            rarityColour = '#ff16ff';
        } else if (mineralObj.rarity >= 100) {
            rarity = "Very Rare";
            rarityColour = '#f7c940';
        } else if (mineralObj.rarity >= 50) {
            rarity = "Rare";
            rarityColour = '#00ddff';
        } else if (mineralObj.rarity >= 20) {
            rarity = "Uncommon";
            rarityColour = '#05ff32';
        } else if (mineralObj.rarity > 0) {
            rarity = "Common";
            rarityColour = '#d6d6d6';
        } else if (mineralObj.rarity <= 0) {
            rarity = "Un-Findable";
            rarityColour = '#ff6b6b';
        }


        if (mineralObj.health < 0) {
            health = mineralObj.health + " Health";
            healthColour = '#ef4f4f';
        } else {
            health = "+" + mineralObj.health + " Health";
            healthColour = '#59f284';
        }

        if (mineralObj.thrust < 0) {
            thrust = mineralObj.thrust + " Thrust";
            thrustColour = '#ef4f4f';
        } else {
            thrust = "+" + mineralObj.thrust + " Thrust";
            thrustColour = '#59f284';
        }

        if (mineralObj.energy < 0) {
            energy = mineralObj.energy + " Energy";
            energyColour = '#ef4f4f';
        } else {
            energy = "+" + mineralObj.energy + " Energy";
            energyColour = '#59f284';
        }

        //Add text
        var customText = game.add.text(textXPos, textYPos, "\n" + mineralObj.displayName + "\n" + rarity + "\n" + mineralObj.desc + "\n" + health + "\n" + thrust + "\n" + energy, Game.style);
        customText.lineSpacing = 20;

        //Add text colours
        customText.addColor('#fff', 0);
        customText.addColor(rarityColour, (mineralObj.displayName + "\n").length - 1);
        customText.addColor('#fff', (mineralObj.displayName + "\n" + rarity + "\n").length - 2);
        customText.addColor(healthColour, (mineralObj.displayName + "\n" + rarity + "\n" + mineralObj.desc + "\n").length - 3);
        customText.addColor(thrustColour, (mineralObj.displayName + "\n" + rarity + "\n" + mineralObj.desc + "\n" + health + "\n").length - 4);
        customText.addColor(energyColour, (mineralObj.displayName + "\n" + rarity + "\n" + mineralObj.desc + "\n" + health + "\n" + thrust + "\n").length - 5);

        customText.addFontWeight('bold', 0);
        customText.addFontWeight('normal', (mineralObj.displayName + "\n").length - 1);

        customText.addFontWeight('bold', 0);
        //customText.addFontWeight('normal', mineralObj.displayName.length);

        //customText.addFontStyle('italic', mineralObj.displayName.length);
        //customText.addFontStyle('normal', mineralObj.displayName.length + mineralObj.desc.length);

        //Add Background
        //console.log(textXPos - padding * 2 + " OR " + (textXPos - padding) * 2 + "");
        var customBack = mineral.custom.text.create(textXPos - padding * 2, textYPos - padding, 'textBack');
        customBack.scale.setTo(customText.width + padding * 4, customText.height + padding * 2);

        mineral.custom.box = null;
        //Attach to mineral
        mineral.custom.text.add(customText);
        mineral.addChild(mineral.custom.text);

        return mineral;
    },

    animation: function (x, y, asset) {
        var animation = game.add.sprite(x, y, asset.name);
        animation.animations.add('animate');
        animation.animations.play('animate', asset.frameRate, true);
        return animation;
    },

    dragBox: function (x, y) {
        var box = Game.dragBoxes.create(x, y, 'box');
        box.custom = {
            data: {
                mineral: null
            }
        };
        box.scale.setTo(Game.dragBoxScale);
        game.world.bringToTop(Game.dragBoxes);
        return box;
    },

    panel: function (x, y, x2, y2, background) {
        var scale = 2;
        var background = game.add.tileSprite(x, y, x2, y2, background);
        background.tileScale.set(scale);
        return background;
    },

    inventory: function () {
        dX = 0;
        dY = 64;
        x = dX;
        y = dY;

        if (Game.inv.equiped != null) {
            var tempItems = JSON.parse(JSON.stringify(Game.inv.equiped));
        } else {
            tempItems = [null, null, null];
        }
        console.log("Starting Inventory Display!");
        Game.inv.items.forEach(function (item) {

            var index = Game.objectIndexOf(tempItems, item.name, "name");
            console.log("Item: " + item.name + " at " + index);
            console.log("tempItems Array: ");
            console.log(tempItems);

            if (index >= 0) {

                tempItems[index] = null;

                var mineral = Game.renders.mineral(75, 75, item);

                if (index == 0) {

                    Game.minInBox([true, Game.ship.nose], mineral);
                    game.world.bringToTop(mineral);

                } else if (index == 1) {

                    Game.minInBox([true, Game.ship.body], mineral);
                    game.world.bringToTop(mineral);

                } else if (index == 2) {

                    Game.minInBox([true, Game.ship.thrust], mineral);
                    game.world.bringToTop(mineral);

                }

            } else {
                var mineral = Game.renders.mineral(x, y, item);
                var box = Game.invDragBox(x, y, mineral);
                mineral.custom.data.box = box;
                if (x >= (Game.width / 3) - 128) {
                    x = dX;
                    y += 64;
                } else {
                    x += 64;
                }
            }
        });

        for (i = 1; i <= 29 - Game.inv.items.length; i++) {
            var box = Game.invDragBox(x, y, null);
            if (x >= (Game.width / 3) - 128) {
                x = dX;
                y += 64;
            } else {
                x += 64;
            }
        }
        Game.trash = Game.invDragBox(x, y, null);
        Game.trashIcon = game.add.sprite(x, y, 'trashIcon');
        Game.trashIcon.scale.setTo(2);
        Game.trashIcon.alpha = 0.5;
    }
};

Game.commands = {
    addItem: function (item) {
        if (Game.inv.items.length < 29) {
            Game.inv.items.push(item);
        }
        localStorage.setItem("inv", JSON.stringify(Game.inv.items));
    },

    removeItem: function (item) {
        var index = Game.objectIndexOf(Game.inv.items, item.name, "name");
        console.log(index);
        if (index >= 0) {
            Game.inv.items.splice(index, 1);
            localStorage.setItem("inv", JSON.stringify(Game.inv.items));
        }
    },

    getBoxData: function (box) {
        return box.custom.data;
    },

    clearInv: function () {
        Game.inv.items = [];
        localStorage.setItem("inv", JSON.stringify(Game.inv.items));
    }
};

Game.mineralOver = function (mineral) {
    mineral.custom.text.visible = true;
    game.world.bringToTop(mineral);
}

Game.mineralOut = function (mineral) {
    mineral.custom.text.visible = false;
}

Game.mineralDown = function (mineral) {
    mineral.custom.text.visible = false;
    mineral.custom.oldX = mineral.x;
    mineral.custom.oldY = mineral.y;
    mineral.alpha = 0.8;
    Game.saveOldBox(mineral);
}

Game.mineralUp = function (mineral) {
    mineral.custom.text.visible = true;
    Game.minInBox(Game.checkBox(mineral), mineral);
    mineral.alpha = 1;
}

//Test for mineral over boxes
Game.checkBox = function (mineral) {
    var found = false;
    var foundItem = null;
    Game.dragBoxes.forEach(function (item) {
        if (!found) {
            if (Game.checkOverlap(item, mineral) && item.custom.data.mineral == null) {
                foundItem = item;
                found = true;
            }
        }
    });
    //Return true/false and box sprite
    return [found, foundItem];
}

//Put mineral in box
Game.minInBox = function (boxArray, mineral) {
    var found = boxArray[0];
    var box = boxArray[1];

    var boxSize = Game.dragBoxSize * Game.dragBoxScale;
    var minSize = Game.mineralSize * Game.mineralScale;

    if (found) {
        //Calculate mineral into center of box
        mineral.x = box.x + boxSize / 2 - minSize / 2;
        mineral.y = box.y + boxSize / 2 - minSize / 2;

        //Tell the box what it has inside
        box.custom.data.mineral = mineral;

        //Tell the mineral what box it is in
        mineral.custom.data.box = box;

        //Clear old box data
        Game.clearBoxData(mineral.custom.data.oldBox);

        Game.itemUpdate();
    } else {
        mineral.x = mineral.custom.oldX;
        mineral.y = mineral.custom.oldY;
    }
}

Game.saveOldBox = function (mineral) {
    mineral.custom.data.oldBox = mineral.custom.data.box;
}

Game.clearBoxData = function (box) {
    if (box != null) {
        box.custom.data.mineral = null;
    }
}

Game.checkOverlap = function (spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

Game.randRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

Game.createLvl = function (x, y, img, scale, level) {
    var lvl = game.add.sprite(x, y, img);
    lvl.scale.setTo(scale);
    if (Game.includes(Game.locked, level)) {
        var lvlLocked = game.add.sprite(x, y, 'locked');
        lvlLocked.scale.setTo(scale);
    } else {
        lvl.inputEnabled = true;
        lvl.events.onInputDown.add(Game.loadLvl, 0, 0, level, Game.ship.nose, Game.ship.body, Game.ship.thrust);
    }
    return lvl;
}

Game.loadLvl = function (a, b, level, nose, body, thrust) {
    var nose = Game.commands.getBoxData(nose).mineral;
    var body = Game.commands.getBoxData(body).mineral;
    var thrust = Game.commands.getBoxData(thrust).mineral;

    var health = 0;
    var battery = 0;
    var power = 0;

    var marshmallow = false;
    if (nose !== null) {
        health += nose.custom.obj.health;
        battery += nose.custom.obj.energy;
        power += nose.custom.obj.thrust;
        if (nose.custom.obj.name == "marshmallow") {
            marshmallow = true;
        }
    }

    if (body !== null) {
        health += body.custom.obj.health;
        battery += body.custom.obj.energy;
        power += body.custom.obj.thrust;
        if (body.custom.obj.name == "marshmallow") {
            marshmallow = true;
        }
    }

    if (thrust !== null) {
        health += thrust.custom.obj.health;
        battery += thrust.custom.obj.energy;
        power += thrust.custom.obj.thrust;
        if (thrust.custom.obj.name == "marshmallow") {
            marshmallow = true;
        }
    }

    Rocket.health = Game.health + health;
    Rocket.battery = Game.energy + battery;
    Rocket.thrust = Game.thrust + power;
    Rocket.marshmallow = marshmallow;
    Space.minAsteroids = level * 10;
    Space.maxAsteroids = level * 20;
    Space.level = level;
    clearInterval(Game.check);
    if (Game.music != null) {
        Game.music.pause();
    }
    game.state.start('Space');
}

Game.invDragBox = function (x, y, item) {
    var box = Game.dragBoxes.create(x - 8, y - 10, 'box');
    box.alpha = 0;
    box.custom = {
        data: {
            mineral: item
        }
    };
    box.scale.setTo(1);
    return box;
}

Game.loadEmail = function (email) {
    return [email.sender, email.message, email.image, email.required, email.reward];
}

Game.includes = function (container, value) {
    var returnValue = false;
    var pos = container.indexOf(value);
    if (pos >= 0) {
        returnValue = true;
    }
    return returnValue;
}

Game.objectIndexOf = function (myArray, searchTerm, property) {
    for (var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i] != null) {
            if (myArray[i][property] === searchTerm) return i;
        }
    }
    return -1;
}

Game.invContains = function (item, amount) {
    var included = false;
    var tempInv = JSON.parse(JSON.stringify(Game.inv.items));
    var found = 0;
    for (i = 0; i < amount; i++) {
        tempInv.forEach(function (e) {
            if (item.name == e.name && included == false) {
                var index = Game.objectIndexOf(tempInv, item.name, "name");
                tempInv.splice(index, 1);
                found += 1;
            }
        });
    }
    if (found >= amount) {
        included = true;
    }
    //console.log("Checked For: " + amount + " Of " + item.name + " And Found " + found);
    return [included, found];
}

Game.restart = function () {
    Game.commands.clearInv();
    Game.email = 0;
    Game.tut = true;
    localStorage.setItem("tut", JSON.stringify(Game.tut));
    Game.locked = [1, 2, 3, 4, 5, 6];
    localStorage.setItem("email", JSON.stringify(Game.email));
    game.state.start('Tut');
}

Game.switchSprite = function (spriteA, spriteB) {
    if (spriteA.alpha > 0) {
        spriteB.alpha = spriteA.alpha;
        spriteA.alpha = 0;
    } else if (spriteB.alpha > 0) {
        spriteA.alpha = spriteB.alpha;
        spriteB.alpha = 0
    }
}
