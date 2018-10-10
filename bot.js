const { Client, Attachment } = require('discord.js')
const client = new Client()
const { token } = require('./auth.json')
const aoeCommands = require('./aoe-commands.json')
const aoeMp3sData = require('./aoe-mp3s.json')

let ready = true;

client.on('ready', () => {
  console.log('ready!')
})

client.on('message', message => {
  if (message.content.substring(0, 1) === '!') {
    if (message.content.substring(0, 4) == '!aoe' && ready == true) {
      ready = false;
      aoeMp3s(message)

    } else if (message.content.substring(0, 7) == "!wololo" && ready == true) {
      ready = false;
      wololo(message)
    }
  }
})


function aoeMp3s(message) {
  let args = message.content.split(' ')
  let cmd = Number(args[1])
  if (cmd <= 42 && cmd > 0) {
    let voiceChannel = message.member.voiceChannel
    if (message.member.voiceChannel == null) {
      message.channel.send('Get in vc ya scrub')
    } else {
      voiceChannel
        .join()
        .then(connection => {
          const dispatcher = connection.playFile(aoeMp3sData[cmd])
          dispatcher.on('end', end => {
            voiceChannel.leave()
          })
        })
        .catch(err => {
          message.channel.send('AOE bot has resigned')
          console.log(err)
          voiceChannel.leave()
        })
    }
  }
  ready = true
}

function wololo(message) {
  let voiceChannel = message.member.voiceChannel
  if (message.member.voiceChannel == null) {
    const attachment = new Attachment('./wololo.png')
    message.channel.send(attachment)
  } else {

    voiceChannel
      .join()
      .then(connection => {
        const dispatcher = connection.playFile(aoeMp3sData[30])
        dispatcher.on('end', end => {
          voiceChannel.leave()
        })
      })
      .catch(err => {
        message.channel.send('AOE bot has resigned')
        console.log(err)
        voiceChannel.leave()
      })

    const attachment = new Attachment('./wololo.png')
    message.channel.send(attachment)
  }
  ready = true
}

client.login(token);