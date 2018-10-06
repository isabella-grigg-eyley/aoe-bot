const { Client, Attachment } = require('discord.js')
const client = new Client()
const { token } = require('./auth.json')
const aoeCommands = require('./aoe-commands.json')
const aoeMp3s = require('./aoe-mp3s.json')


client.on('ready', () => {
  console.log('ready!')
})

client.on('message', message => {
  if (message.content.substring(0, 1) === '!') {
    if (message.content.substring(0, 4) == '!aoe') {
      aoePhrases(message)
    } else if (message.content.substring(0, 7) == "!wololo") {
      wololo(message)
    }
  }
})

function aoePhrases(message) {
  let args = message.content.split(' ')
  let cmd = Number(args[1])
  if (cmd <= 42 && cmd > 0) {
    //let phrase = aoeCommands[cmd]
    //message.channel.send(phrase, { tts: true })
    const attachment = new Attachment(aoeMp3s[cmd])
    console.log(aoeMp3s[cmd])
    message.channel.send(attachment)
  }
}

function wololo(message) {
  const attachment = new Attachment('./wololo.png')
  message.channel.send(attachment)
}

client.login(token);