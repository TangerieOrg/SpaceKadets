var tutEmails = [
    {
        sender: 'Ben',
        image: 'ben',
        message: 'Hello? Anyone there.',
        required: [],
        reward: [],
        next: true
    },
    
    {
        sender: 'Ben',
        image: 'ben',
        message: 'Oh, Hello, my name is Ben. I will be your guide through this journey. Your job is to travel through the galaxies and make connections with people along the way. So I hope you have a ship. Do you? \n \nYour first mission is to collect 2 copper, so click on area 1, the ancient galaxy to fly around using the left, right and up keys and keep going back to the area until you get 2 copper. Although, be wary, you must reach the planet to keep your resources.',
        required: [
            {
                item: Itms.copper,
                amount: 2
            }
        ],
        reward: [
            {
                item: Itms.copper,
                amount: 2
            }
        ],
        next: true
    },
    
    {
        sender: 'Ben',
        image: 'ben',
        message: 'A wooden ship?!?!? What were you thinking! We are in space, not the sea!! Well we will need to get that repaired fast. \n \nAnyway, great you got the copper! Now click and drag each one to each of the slots above the conical flask and click on the flask to craft something! Remember, not everything can be crafted together.',
        required: [
            {
                item: Itms.foolsGold,
                amount: 1
            }
        ],
        reward: [
            {
                item: Itms.foolsGold,
                amount: 1
            }
        ],
        next: true
    },
    
    {
        sender: 'Ben',
        image: 'ben',
        message: 'Great, now drag that new item into any of the slots on the right side of the screen to boost your ships stats. The higher the battery, the longer you survive, the higher the health, the more CRASHES you can make and the higher the thrust, the faster you go. \n\nThe 244 shuttle is now arriving at the Station but we will talk soon. You may receive some traders but as long as you get them what they want, you will be just fine. You get jist of things, right?',
        required: [],
        reward: [],
        next: true
    }
]

var Emails = [
    
    {
        sender: 'Brother Luke',
        image: 'brotherLuke',
        message: 'Greetings companion. You seem ... confused, frightened even. You have obviously not yet been enlightened for their is no need to be afraid of me. With my brothers I can show you the way through the cosmos. First, I must gather resources to go to the Moon of Gragon, but we will return. ',
        required: [
            {
            item: Itms.copper,
            amount: 3
            }
        ],
        reward: [
            {
                item: Itms.iron,
                amount: 2
            },
            {
                item: Itms.aluminium,
                amount: 1
            }
        ]
    },
    
    {
        sender: 'C-6347',
        image: 'confederacyRobot',
        message: 'Hello, Trader! I understand that your system has recently been inducted into the jurisdiction of the Galactic Confederacy. It is an honour to have access to the shelter and protection the Confederacy provides and thus we expect you to work hard and keep our economy running.',
        required: [
            {
                item: Itms.iron,
                amount: 5
            },
            {
                item: Itms.copper,
                amount: 5
            }
        ],
        reward: [
            {
                item: Itms.spaceGas,
                amount: 3
            }
        ]
    },
    
    {
        sender: 'Ben',
        image: 'ben',
        message: 'On my travels, I found a ship blueprint which can help us reduce the amount of wood on your ship and get that thing going. I have already got a team to fix it meaning that you, my dear friend can travel further through the galaxy and get to Starlight City. Some of the traders are a little weird here, but be friendly. OK? \n\nStarlight City is not a safe place to be floating around, so take care and DO NOT get involved in the war.',
        required: [],
        reward: [],
        next: true
    },
    
    {
        sender: 'Grotto Ents',
        image: 'grotto',
        message: "I saw a confederate robot approach you. I wouldn't trust 'em and I can tell you don't either. That's why I've come to you. We're starting a revolution and we need your help.",
        required: [
            {
                item: Itms.aluminium,
                amount: 3
            },
            {
                item: Itms.copper,
                amount: 5
            }
        ],
        reward: [
            {
                item: Itms.gemstone,
                amount: 1
            },
        ]
    },
    
    {
        sender: 'Trader Mike',
        image: 'mike',
        message: "G'day Mate. The name's Mike, intergalactic trader. I'd love to buy some goods off ya.",
        required: [
            {
                item: Itms.copper,
                amount: 5
            }
        ],
        reward: [
            {
                item: Itms.lead,
                amount: 3
            },
        ]
    },
    
    {
        sender: 'Brother Paul',
        image: 'brotherPaul',
        message: 'Greetings companion, I have returned from the Astron Nebulae where through the wonders of the constellations it was revealed to me, the majestic powers of the Cosmos. I have little resources and must continue my journey of enlightenment to a nearby Galaxy.',
        required: [
            {
            item: Itms.iron,
            amount: 5
            }, 
            {
            item: Itms.copper,
            amount: 10
            }
        ],
        reward: [
            {
            item: Itms.gold,
            amount: 1
            }   
        ]
    },
    
    {
        sender: 'Ben',
        image: 'ben',
        message: "Hello again, I am in grave danger and I need to get out of Starlight City ASAP. I will meet you soon, where will explain further in private. I have fixed your ship so you will be ready to pick me up when we next meet. You can now travel further through the galaxy to the Universal Central Station with your fixed ship. I will see you in the near future. \n\nRegards, Ben",
        required: [],
        reward: [],
        next: true
    },
    
    {
        sender: 'Sarah Conroy',
        image: 'sarah',
        message: "I understand that the continued mining of Copper in the Porphyrion System has led to a dramatic increase in dangerous radioactive gas. I'm here to gather statistics on the amount of gas in the system and present my findings to the Galactic Confederacy. Those greedy capitalists have no respect for the environment.",
        required: [
            {
            item: Itms.spaceGas,
            amount: 5
            }
        ],
        reward: [
            {
            item: Itms.plutonium,
            amount: 2
            }   
        ]
    },
    
    {
        sender: 'Dalmill Malwes',
        image: 'dalmill',
        message: "We are setting up the foundations for a revolution across multiple systems. This war will take time but with the injustices the Confederation has committed it is necessary. Can we trust you to supply us with materials throughout this campaign?",
        required: [
            {
            item: Itms.mercury,
            amount: 2
            },
            {
            item: Itms.lead,
            amount: 2
            } 
        ],
        reward: [
            {
            item: Itms.steel,
            amount: 5
            } 
        ]
    },
    
    {
        sender: 'Copernicus',
        image: 'copernicus',
        message: "Good morning, collector. I would like to purchase some goods. The Galactic Confederacy provides peace and stability to the galaxy which I fear the rebels will destroy. A war is inevitable so I am stocking up on resources.",
        required: [
            {
            item: Itms.ice,
            amount: 9
            }
        ],
        reward: [
            {
            item: Itms.mercury,
            amount: 4
            }   
        ]
    },
    
    {
        sender: 'Ben',
        image: 'ben',
        message: "O.K., Now that I am on your ship I will tell you how I got into this mess. So the Inydri of Joragtor hired me to help them hire staff for a top secret upcoming event. I visited many planets searching for people, but when I found you on Earth, I knew that you were the person I was looking for. On my way back to Joragtor, I started to become friends with you and I went around showing you the galaxy. The only thing is... A couple of years went by and I never took you to the Inydri, and it was only 2 months ago when I decided to hand you in and remove all your previous memories. ",
        required: [],
        reward: [],
        next: true
    },
    
    {
        sender: 'Ben',
        image: 'ben',
        message: "But when I arrived, the Inydri's whole secret event had been a massive failure and I was blamed for it. We were separated and ever since, I have messaged you to help us reunite and continue exploring the galaxy. Unfortunately the Inydri are now seeking revenge and we will be forever escaping their wrath. We will need to bargain with travelling merchants to give us the necessary resources to help us on our escape journey, and from now on, I will be staying in this ship, so I have completely fixed it. Sorry for getting you involved in this mess. Talk soon",
        required: [],
        reward: [],
        next: true
    },
    
    {
        sender: 'Sylas Daryen',
        image: 'sylas',
        message: "You gotta help me. Those confederate robots are hunting me down. I just need some parts to repair my ship, They'll kill me if you don't get the parts quickly.",
        required: [
            {
            item: Itms.iron,
            amount: 15
            }
        ],
        reward: [
            {
            item: Itms.darkMatter,
            amount: 1
            }   
        ]
    },
    
    {
        sender: 'Dattoks Ak',
        image: 'dattocks',
        message: "I come on behalf of the Galactic Confederacy; Internal Aid department, requesting you to donate towards the Reptunia 4 campaign. Reptunia 4 was on an intercept orbit course with a fatal meteor. Most civilians were evacuated from the planet but they need vital resources to survive.",
        required: [
            {
            item: Itms.cobalt,
            amount: 3
            }
        ],
        reward: [
            {
            item: Itms.mercury,
            amount: 10
            }   
        ]
    },
    
    {
        sender: 'Brother John',
        image: 'brotherJohn',
        message: "Greetings companion. My fellow brother; Brother Luke has told me you served him well in his journey. So many Trading Posts have defamed the Brotherhood as a greedy cult but you are different and so I have turned to you for help",
        required: [
            {
            item: Itms.aluminium,
            amount: 6
            } 
        ],
        reward: [
            {
            item: Itms.cobalt,
            amount: 2
            } 
        ]
    },
    
    {
        sender: 'Trader Mike',
        image: 'mike',
        message: "G'day Mate. 'emember me from the other day. Well, I sold most of the resources you got me. In return I brought this, it wasn't cheap but I thought you might like it. ",
        required: [
            {
            item: Itms.antiMatter,
            amount: 2
            }
        ],
        reward: [
            {
            item: Itms.neptonumC,
            amount: 1
            }   
        ]
    },
    
    {
        sender: 'Ben',
        image: 'ben',
        message: "The Inydri have tracked you to be a part of my company and there is a price on both of our heads. I can hyperboost our ship to get us into a Hyper Trojan where we can't be traced easily, but it will only but is a couple of months. There is some sort of battle currently going on nearby but if we help a few traders and make allies, maybe they can help us with some battle blueprints in case we come in contact with the Inydri. I'll be downstairs getting food. I'll be back soon.",
        required: [],
        reward: [],
        next: true
    },
    
    {
        sender: 'Dalmill Malwes',
        image: 'dalmill',
        message: "The democratic movement is in place, uprisings across the galaxy have been successful in liberating countless lifeforms from Confederacy oppression, but we need more resources to fund continued efforts. Are you with us?",
        required: [
            {
            item: Itms.gold,
            amount: 1
            },
            {
            item: Itms.glass,
            amount: 1
            }
        ],
        reward: [
            {
            item: Itms.electricity,
            amount: 1
            },
            {
            item: Itms.gemstone,
            amount: 1
            }
        ]
    },
    
    {
        sender: 'Brother Mark',
        image: 'brotherMark',
        message: "Greetings companion. In the wake of this war between the rebels and the Galactic Confederacy, I have found it difficult to move across galactic borders. Thus I must wait here for it to end. Those carbon-based lifeforms have no idea how futile they are next to the power of the Cosmos.",
        required: [
            {
            item: Itms.aluminum,
            amount: 3
            },
            {
            item: Itms.copper,
            amount: 3
            },
            {
            item: Itms.iron,
            amount: 3
            },
        ],
        reward: [
            {
            item: Itms.ion,
            amount: 1
            }   
        ]
    },
    
    {
        sender: 'C-7854',
        image: 'confederacyRobot',
        message: "The Galactic Confederacy requires your mandatory taxes. Upon doing so, you are entitled to complimentary resources for continuing to support the Galactic Confederacy in this time of unease.",
        required: [
            {
            item: Itms.iron,
            amount: 10
            }
        ],
        reward: [
            {
            item: Itms.mercury,
            amount: 10
            }   
        ]
    },
    
    {
        sender: 'Dalmill Mawles',
        image: 'dalmill',
        message: "The Confederacy is trying to bribe citizens into supporting them. We need materials to repair our transmission satellites and convince the population to decline the bribe.",
        required: [
            {
            item: Itms.glass,
            amount: 8
            },
            {
            item: Itms.copper,
            amount: 3
            },
            {
            item: Itms.iron,
            amount: 5
            },
        ],
        reward: [
            {
            item: Itms.oxodisedCopper,
            amount: 2
            }   
        ]
    },
    
    {
        sender: 'Ben',
        image: 'ben',
        message: " I have sent us to an Alternate Dimension which means they will need lightyears to trace us. We are now safe. I think.",
        required: [],
        reward: [],
        next: true
    },
    
    {
        sender: 'Dattoks Ak',
        image: 'dattocks',
        message: "Greetings citizen of the Galactic Confederacy! The Reptunia 4 campaign was a great success and I would like to commend you for your generosity. We are now starting our annual fundraiser and would like you to donate.",
        required: [
            {
            item: Itms.glass,
            amount: 8
            },
            {
            item: Itms.ice,
            amount: 3
            },
        ],
        reward: [
            {
            item: Itms.electricity,
            amount: 2
            }   
        ]
    },
    
    {
        sender: 'Ors Vruomet',
        image: 'ors',
        message: "We need some radioactive isotopes for a movement on Helberg 2. We're in a bit of hurry so I won't be able to brief you on the mission.",
        required: [
            {
            item: Itms.ion,
            amount: 1
            },
            {
            item: Itms.plutonium,
            amount: 2
            },
        ],
        reward: [
            {
            item: Itms.antiMatter,
            amount: 2
            }   
        ]
    },
    
    {
        sender: 'Travelt Weohek',
        image: 'travelt',
        message: "We have tracked down a number of rebels responsible for the devastating act of terrorism on Helberg 2 yesterday, to this planet. A radioactive explosion killed 24 civilians. I urge you for the safety of your community to contact the confederacy if you have any information on the rebels whereabouts.",
        required: [
            {
            item: Itms.antiMatter,
            amount: 1
            }
        ],
        reward: [
            {
            item: Itms.unstableIon,
            amount: 1
            }   
        ]
    },
    
    {
        sender: 'B-4387',
        image: 'specialForces',
        message: "The Galactic Confederacy has detected illegal activity in this facility. Supplying materials to outlaws is illegal under Section 33B, clause 27. Reconditioning for this offense is termination however, the Galactic Confederacy has graciously allowed you to be pardoned for your crime in exchange for resources.",
        required: [
            {
            item: Itms.ion,
            amount: 1
            }
        ],
        reward: [
            {
            item: Itms.neptonumC,
            amount: 1
            }   
        ]
    },
    
    {
        sender: ' Ors Vruomet',
        image: 'ors',
        message: "This oppressive regime, is coming to an end. The Galactic Confederation has nearly fallen but the reign of democracy is just beginning. The final push into their stronghold is underway, for which we need to materials.",
        required: [
            {
            item: Itms.steel,
            amount: 4
            },
            {
            item: Itms.darkMatter,
            amount: 1
            },
        ],
        reward: [
            {
            item: Itms.cobalt,
            amount: 4
            }   
        ]
    },
    
    {
        sender: 'Brother Thomas',
        image: 'brotherThomas',
        message: "Greetings companion. The Cosmos is displeased. I must gather precious resources to sacrifice to the almighty one.",
        required: [
            {
            item: Itms.cobalt,
            amount: 2
            },
            {
            item: Itms.plutonium,
            amount: 1
            },
        ],
        reward: [
            {
            item: Itms.darkMatter,
            amount: 3
            }   
        ]
    },
    
    {
        sender: "Gryz'elz Yeg",
        image: 'trader',
        message: "Greetings collector. I have come to bargain with you for my exotic resources. Hmmm, your eyes betray you, I see you desire these resources far more than I imagined and for that I require a greater price.",
        required: [
            {
            item: Itms.darkMatter,
            amount: 1
            },
            {
            item: Itms.antiMatter,
            amount: 1
            },
        ],
        reward: [
            {
            item: Itms.neptonumB,
            amount: 1
            }   
        ]
    },
    
    {
        sender: 'Unkown',
        image: 'greenHead',
        message: "I want to see what you have! Show me what you have!",
        required: [
            {
            item: Itms.foolsGold,
            amount: 3
            }
        ],
        reward: [
            {
            item: Itms.rustBattery,
            amount: 1
            }   
        ]
    },
    
    {
        sender: 'Christella',
        image: 'christella',
        message: "I do not waste time with introductions. If you do not have what I want, I will promptly be taking my business elsewhere, Collector.",
        required: [
            {
            item: Itms.unstableIon,
            amount: 1
            }
        ],
        reward: [
            {
            item: Itms.ancientChip,
            amount: 1
            }   
        ]
    },
    
    {
        sender: "Gryz'elz Yeg",
        image: 'trader',
        message: "Ah, Collector I have returned with resources far more precious than what I had before. But for that I need something more in return. ",
        required: [
            {
            item: Itms.electricity,
            amount: 2
            }
        ],
        reward: [
            {
            item: Itms.neptonumA,
            amount: 1
            }   
        ]
    },
    
    {
        sender: 'Christella',
        image: 'christella',
        message: "You have not failed me before, Collector. Don't make that change. I am in the market for oxidised copper. WELL!? Come on, where is it!",
        required: [
            {
            item: Itms.oxodisedCopper,
            amount: 3
            }
        ],
        reward: [
            {
            item: Itms.neptonumB,
            amount: 1
            }   
        ]
    },
    
    {
        sender: 'Dalmill Mawles',
        image: 'dalmill',
        message: "We have done it. The plague that was the Galactic Confederacy has been eradicated for the greater good. We can institute a new democratic government. But we are not finished, some planets are ... chaotic. We must persist with the vision we have believed in since the beginning; Equality.",
        required: [
            {
            item: Itms.darkMatter,
            amount: 3
            }   
        ],
        reward: [
            {
            item: Itms.plutonium,
            amount: 8
            }   
        ]
    },
    
    {
        sender: 'Copernicus',
        image: 'copernicus',
        message: "The last time we met, Collector I preached about the great war that was imminent. Well, it happened and now I am on the run much like the rebels you helped to bring about the war and my demise. Just like thousands I am now displaced and have nowhere to go. Have pity on me, collector and make amends of your sins. ",
        required: [
            {
            item: Itms.ion,
            amount: 10
            }
        ],
        reward: [
            {
            item: Itms.ice,
            amount: 1
            }   
        ]
    },
    
    {
        sender: 'Ben',
        image: 'ben',
        message: "Oh no, one of our allies snitched us in to the Inydri and they are searching alternate dimensions. We will have to go now!",
        required: [],
        reward: []
    },
    
    {
        sender: 'Brother Paul',
        image: 'brotherPaul',
        message: "Greetings companion. It has been a long time since we last met. Much has changed in our world but the cosmos still lies supreme. Through this packet of marshmallows, may the Cosmos guide you in your future journeys. But for now ... \nGOODBYE.",
        required: [
            {
            item: Itms.neptonumA,
            amount: 1
            }
        ],
        reward: [
            {
            item: Itms.marshmallow,
            amount: 1
            }   
        ]
    } 
];