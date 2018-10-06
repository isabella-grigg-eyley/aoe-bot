const { Client, Attachment } = require('discord.js')
const client = new Client()
const { token } = require('./auth.json')
const aoe = require('./aoe-commands.json')


client.on('ready', () => {
  console.log('ready!')
})

client.on('message', message => {
  if (message.content.substring(0, 1) === '!') {
    if (message.content.substring(0, 4) == '!aoe') {
      let args = message.content.split(' ')
      let cmd = Number(args[1])
      if (cmd <= 42 && cmd > 0) {
        let phrase = aoe[cmd]
        message.channel.send(phrase, { tts: true })
      }
    } else if (message.content.substring(0, 7) == "!wololo") {
      const attachment = new Attachment('./wololo.png')
      message.channel.send(attachment)
    }
  }
})

client.login(token);