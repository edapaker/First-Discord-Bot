// GLOBALS

const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const token = 'Njk2MTY3NjQ3OTYzNzc1MDc3.XokyzQ.ibyWMwRIfsP5-Gtja8XUHVL19Xo';
const prefix = '/';
var dictionary = new Object();
var date = new Date();

const FRIEND = 0;
const FOE = 1;
const LOVE = 2;

// STARTUP STUFF

client.login(token);

client.on('ready', () => {
    var bookmark = fs.readFileSync('savedata/bookmark.txt').toString();
    var dataRaw = fs.readFileSync('savedata/' + bookmark + '.txt').toString();
    console.log('loaded data:\n', dataRaw);
    dictionary = JSON.parse(dataRaw);
    console.log('bot online');
});

// HELPERS

function negCheck (message) {
    var person = message.member.displayName;
    var stats = dictionary[person];

    for (var i = 0; i < 3; i++) {
        if (stats[i] < 0) stats[i] = 0;
    }
    
    return;
}

function capCheck (message) {
    var person = message.member.displayName;
    var stats = dictionary[person];

    for (var i = 0; i < 3; i++) {
        if (stats[i] > 10) stats[i] = 10;
    }
}

// ACTIVITIES

function talk (message, choice) {
    var person = dictionary[message.member.displayName];

    switch(choice) {
        case 'chat':
            if (person[FOE] <= 2) {
                person[FRIEND]++;
                message.reply('haha, that\'s cool');
            } else {
                message.reply('why would I care?');
            }
            break;

        case 'compliment':
            if (person[FOE] <= 2) {
                person[FRIEND] += 2;
                person[FOE]--;
                message.reply('thank you!');
            } else {
                message.reply('don\'t bother sucking up to me');
            }
            break;

        case 'flirt':
            if ((person[FRIEND] >= 8) && (person[FOE] === 0)) {
                person[LOVE]++;
                message.reply('owo');
            } else {
                person[FRIEND]--;
                person[FOE]++;
                message.reply('creep');
            }
            break;
        
        case 'apologize':
            if (person[FOE] > 2) {
                person[FOE] -= 2;
                message.reply('apology accepted');
            } else {
                message.reply('you have nothing to apologize for');
            }
            break;

        case 'insult':
            if (person[FRIEND] >= 8) {
                person[FOE]+= 2;
                person[FRIEND]-= 3;
                message.reply('how could you say that?');
            } else {
                person[FOE]++;
                person[FRIEND]--;
                message.reply('that was mean');
            }
            break;

        case 'help':
            message.reply('\nchat // make some small talk\ncompliment // say something nice\ninsult // make an offensive comment\napologize // ask for forgiveness\nflirt // owo');
            break

        default:
            message.reply('invalid command, type "/talk help" to see list of commands');
            return;
    }
    
    return;
}

function status (message) {
    var person = message.member.displayName;
    var stats = dictionary[person];
    
    message.reply('\nFriend: ' + stats[0] + '\nEnemy: ' + stats[1] + '\nLove: ' + stats[2]);
    
    return;
}

// COMMANDS

client.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ");

    switch(args[0]) {
        case 'talk':
        case 't':
            talk(message, args[1]);
            negCheck(message);
            capCheck(message);
            break;

        case 'status':
        case 's':
            status(message);
            break;
        
        case 'introduce':
            if (!(message.member.displayName in dictionary)) {
                dictionary[message.member.displayName] = [0, 0, 0];
                message.reply('it\'s nice to meet you');
            } else {
                message.reply('I already know you, silly');
            }
            break;

        case 'save':
            var saveString = JSON.stringify(dictionary);
            var saveTime = date.getTime();
            fs.writeFile('savedata/' + saveTime + '.txt', saveString, err => {
                if (err) throw err;
                console.log('data saved');
            });
            fs.writeFile('savedata/bookmark.txt', saveTime, err => {
                if (err) throw err;
                console.log('bookmark saved');
            });
            break;

        case 'help':
            message.reply('\ntalk\nstatus\nintroduce')
    }
});