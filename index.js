//Made of Syvrus(Brian Corbita)
const Discord = require("discord.js");
//const cloudinary = require("cloudinary-core");

const TOKEN = "NTY2MzE1ODUyMjU3ODIwNjkz.XLFXDQ.uFWHBGK35y9qepeB63eVBrmDNbk";

PREFIX = "$";

var bot = new Discord.Client();
//var c = new cloudinary.Cloudinary({cloud_name: "syvrus", secure:true});

bot.on("ready", function(){
    console.log("Systems: Online");
    //bot.channels.get("566319461968248837").send("Systems: Online");
});

bot.on("message", function(message){
    if(message.author.equals(bot.user) || !message.content.startsWith(PREFIX)){ 
        return;
    }
    var args = message.content.substring(PREFIX.length).split(" ");

    message.channel.send(args[0].toLowerCase());
    
    switch (args[0].toLowerCase()){
        //Rolls user-prompted dice amount that are user-prompted dice sides
        case "roll":
        case "r":
            //formatted input is <int>d<int>
            var amount = Number(args[1].substring(0,args[1].indexOf("d")));//First <int> is amount of dice
            var dice = Number(args[1].substring(args[1].indexOf("d") + 1));//Second <int> sides on dice
            var eq = "";
            var tot = 0;
            for (var i = 0; i < (amount - 1); i++){
                var val = Math.ceil(Math.random() * dice);
                tot += val;
                eq += (val.toString() + " + ");
            }
            val = Math.ceil(Math.random() * dice);
            tot += val;
            eq += val.toString() + " = " + tot.toString();
            message.channel.send("Rolling...");
            message.channel.send("Your results are " + eq);
        break;
        //Same as roll but with suspense
        case "sroll":
        case "sr":
            var amount = Number(args[1].substring(0,args[1].indexOf("d")));
            var dice = Number(args[1].substring(args[1].indexOf("d") + 1));
            var eq = "||";
            var tot = 0;
            for (var i = 0; i < (amount - 1); i++){
                var val = Math.ceil(Math.random() * dice);
                tot += val;
                eq += (val.toString() + " + ");
            }
            val = Math.ceil(Math.random() * dice);
            tot += val;
            eq += val.toString() + "|| = ||" + tot.toString();
            message.channel.send("Rolling...");
            message.channel.send("Your results are " + eq + "||");
        break;
        //Generates character sheet with randomly generated elements
        case "generate":
        case "gen":
        case "g":
            //Races
            var races = [
                "Human",
                "Dwarf",
                "Elf",
                "Gnome",
                "Half-Elf",
                "Half-Orc",
                "Halfling"
            ];
            var race = races[Math.ceil(Math.random() * races.length)];

            //Classes
            var jobs = [
                "Barbarian",
                "Bard",
                "Cleric",
                "Druid",
                "Fighter",
                "Monk",
                "Paladin",
                "Ranger",
                "Rogue",
                "Sorcerer",
                "Wizard"
            ];
            var job = jobs[Math.ceil(Math.random() * jobs.length)];
            
            //Rolls for stats
            var scores = new Array(6);
            var rolls = new Array(4);
            for (var i = 0; i < 6; i++){
                for (var j = 0; j < 4; j++){
                    rolls[j] = Math.ceil(Math.random() * dice);
                }
                rolls.sort(function(a, b){return b - a});
                var score = 0;
                for (var j = 0; j < 3; j++){
                    score += rolls[j];
                }
                scores[i] = score;
            }
            scores.sort(function(a, b){return b - a});

            var attributes = new Array(6); //{STR, DEX, CON, INT, WIS, CHA}

            //Optimizes attributes based on class
            switch(job){
                case jobs[0]: //Barbarian
                    var low = scores[Math.ceil(Math.random() * 2) + 3];
                    attributes[0] = scores[0];
                    attributes[1] = scores[2];
                    attributes[2] = scores[1];
                    attributes[3] = scores[low];
                    attributes[4] = scores[3];
                    if (low == scores[4])
                        attributes[5] = scores[5];
                    else
                        attributes[5] = scores[4];
                break;
                case jobs[1]: //Bard
                    var high = scores[Math.ceil(Math.random() * 2)];
                    var low = scores[Math.ceil(Math.random() * 2) + 2];
                    attributes[0] = scores[low];
                    attributes[1] = scores[high];
                    if(low == scores[3])
                        attributes[2] = scores[4];
                    else
                        attributes[2] = scores[3];
                    if(high == scores[1])
                        attributes[3] = scores[2];
                    else
                        attributes[3] = scores[1]
                    attributes[4] = scores[5];
                    attributes[5] = scores[0];
                break;
                case jobs[2]: //Cleric
                    var high = scores[Math.ceil(Math.random() * 2)];
                    var low = scores[Math.ceil(Math.random() * 2) + 3];
                    attributes[0] = scores[3];
                    attributes[1] = scores[low];
                    attributes[2] = scores[high];
                    if(low == scores[4])
                        attributes[3] = scores[5];
                    else
                        attributes[3] = score[4];
                    attributes[4] = scores[0];
                    if(high == scores[1])
                        attributes[5] = scores[2];
                    else
                        attributes[5] = scores[1];
                break;
                case jobs[3]://Druid
                    var low = scores[Math.ceil(Math.random() * 2) + 3];
                    attributes[0] = scores[3];
                    attributes[1] = scores[1];
                    attributes[2] = scores[2];
                    attributes[3] = scores[low];
                    attributes[4] = scores[0];
                    if (low == scores[4])
                        attributes[5] = scores[5];
                    else
                        attributes[5] = scores[4];
                break;
                case jobs[4]://Fighter
                     var low = scores[Math.ceil(Math.random() * 2) + 3];
                    attributes[0] = scores[0];
                    attributes[1] = scores[2];
                    attributes[2] = scores[1];
                    attributes[3] = scores[3];
                    attributes[4] = score[low];
                    if (low == scores[4])
                        attributes[5] = scores[5];
                    else
                        attributes[5] = scores[4];
                break;
                case jobs[5]://Monk
                    var high = scores[Math.ceil(Math.random() * 2) + 1];
                    var low = scores[Math.ceil(Math.random() * 2) + 3];
                    attributes[0] = scores[high];
                    if(high == scores[2])
                        attributes[1] = scores[2];
                    else
                        attributes[1] = scores[3];
                    attributes[2] = scores[1];
                    attributes[3] = scores[low];
                    attributes[4] = scores[0];
                    if (low == scores[4])
                        attributes[5] = scores[5];
                    else
                        attributes[5] = scores[4];
                break;
                case jobs[6]://Paladin
                     var low = scores[Math.ceil(Math.random() * 2) + 3];
                    attributes[0] = scores[1];
                    attributes[1] = scores[low];
                    attributes[2] = scores[3];
                    if(low == scores[4])
                        attributes[3] = scores[5];
                    else
                        attributes[3] = scores[4];
                    attributes[4] = scores[2];
                    attributes[5] = scores[0];
                break;
                case jobs[7]://Ranger
                    var low = scores[Math.ceil(Math.random() * 2) + 3];
                    attributes[0] = scores[1];
                    attributes[1] = scores[0];
                    attributes[2] = scores[3];
                    attributes[3] = scores[low];
                    attributes[4] = scores[2];
                    if (low == scores[4])
                        attributes[5] = scores[5];
                    else
                        attributes[5] = scores[4];
                break;
                case jobs[8]://Rogue
                    var low = scores[Math.ceil(Math.random() * 2) + 3];
                    attributes[0] = scores[low];
                    attributes[1] = scores[0];
                    attributes[2] = scores[3];
                    attributes[3] = scores[1];
                    attributes[4] = scores[2];
                    if (low == scores[4])
                        attributes[5] = scores[5];
                    else
                        attributes[5] = scores[4];
                break;
                case jobs[9]://Sorcerer
                    var low = scores[Math.ceil(Math.random() * 2) + 2];
                    attributes[0] = scores[5];
                    attributes[1] = scores[2];
                    attributes[2] = scores[1];
                    attributes[3] = scores[low];
                    if(low == scores[4])
                        attributes[4] = scores[3];
                    else
                        attributes[4] = scores[4]
                    attributes[5] = scores[0];
                break;
                case jobs[10]://Wizard
                    attributes[0] = scores[4];
                    attributes[1] = scores[1];
                    attributes[2] = scores[2];
                    attributes[3] = scores[0];
                    attributes[4] = scores[3];
                    attributes[5] = scores[5];
                break;
                default:
            }

            switch(race){
                default:
            }
            /*var sheet = new Discord.RichEmbed()
                .setAuthor(message.author.username)
                .setDescription("Character for DnD 3.5")
                .setColor("#000000")
                .
                */
            
        break;
        //Joins voice channel of user to play given music
        case "play":
        case "p":
        break;
        //Shows all the commands the bot has
        case "help":
            message.channel.send("1. \"(s)roll\"/\"(s)r\" #d#: rolls given amount of given amount sided of dice"
                                + "\n2. \"generate\"/\"gen\"/\"g\" : WIP"
                                + "\n3. \"play\"/\"p\" : WIP");
        break;
        //When none of the commands apply
        default:
            message.channel.send("Invalid command");
    }

});

bot.login(TOKEN);