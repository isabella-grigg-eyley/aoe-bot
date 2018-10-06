var Discord = require('discord.io')
var { MessageAttachment } = require('discord.js');
var logger = require('winston')
var auth = require('./auth.json')

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});

bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', message => {
  message.channel.send('blah')
})
// bot.on('message', function (user, userID, channelID, message, evt) {
//   // Our bot needs to know if it will execute a command
//   // It will listen for messages that will start with `!`
//   if (message.substring(0, 4) == '!aoe') {
//     var args = message.split(' ')
//     var cmd = args[1]
//     var num = Number(cmd)
//     // bot.sendMessage({
//     //   to: channelID,
//     //   message: `/tts ${num}`
//     // });
//     message.channel.send('boop', { tts: true })

//     // channel.send("hello", { tts: true })

//     // var args = message.substring(1).split(' ');
//     // var cmd = args[0];

//     // args = args.splice(1);
//     // switch (cmd) {
//     //   // !ping
//     //   case 'ping':
//     //     bot.sendMessage({
//     //       to: channelID,
//     //       message: 'Pong!'
//     //     });
//     //     break;
//     //   // Just add any case commands if you want to..
//     // }
//   }

  // if (message.substring(0, 7) == '!wololo') {
  //   // var wololo = new MessageAttachment('./wololo.png')
  //   // message.channel.send(attachment)
  // }
// });