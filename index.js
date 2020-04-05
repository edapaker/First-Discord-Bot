// GLOBALS

const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const token = 'Njk2MTY3NjQ3OTYzNzc1MDc3.XokyzQ.ibyWMwRIfsP5-Gtja8XUHVL19Xo';
const prefix = '/';
var names = new Array();            // will be used to store saved names
var dictionary = new Object();      // will be used to store saved data

// STARTUP STUFF

client.login(token);

client.on('ready', () => {
    console.log('First Bot: ONLINE');
});

// ACTIVITIES

function talk (message, choice) {
    switch(choice) {
        case 'chat':
            message.reply('haha, that\'s cool');
            break;
        case 'insult':
            message.reply('that was mean');
            break;
        case 'help':
            message.channel.send('chat // make some small talk\ninsult // make an offensive comment');
            break
        default:
            message.reply('invalid command, type "/talk help" to see list of commands');
            return;
    }
    
    return;
}

// COMMANDS

client.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ");

    switch(args[0]) {
        case 'talk':
            talk(message, args[1]);
            break;
        case 'test':
            // STRINGIFY AND PARSE
    }
});