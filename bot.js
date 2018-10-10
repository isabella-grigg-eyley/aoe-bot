const { Client, Attachment } = require('discord.js')
const client = new Client()
const { token } = require('./auth.json')
const aoeCommands = require('./aoe-commands.json')
const aoeMp3sData = require('./aoe-mp3s.json')
const startupCommands = require('./startups')
const playstationSounds = require('./playstation.json')
const miscSounds = require('./misc.json')

let fmaBool = true;

let ready = true;

client.on('ready', () => {
  console.log('ready!')
  let aoebotChannel = client.channels.get('392199619758784523')
  let rand = Math.floor(Math.random() * 3)
  console.log(startupCommands[rand])
  aoebotChannel.send(startupCommands[rand])
})

client.on('message', message => {
  try {
    if (message.content.substring(0, 1) === '!') {
      if (message.content.substring(0, 4) == '!aoe' && ready == true) {
        ready = false;
        aoeMp3s(message)
      } else if (message.content.substring(0, 7) == "!wololo" && ready == true) {
        ready = false;
        wololo(message)
      } else if (message.content.substring(0, 4) == "!ps1" && ready == true) {
        ready = false;
        playstation(message, '1')
      } else if (message.content.substring(0, 4) == "!ps2" && ready == true) {
        ready = false;
        playstation(message, '2')
      } else if (message.content.substring(0, 4) == "!law" && ready == true) {
        ready = false;
        playMisc(message, 'law')
      } else if (message.content.substring(0, 13) == "!is-only-game" && ready == true) {
        ready = false;
        playMisc(message, 'is-only-game')
      } else if (message.content.substring(0, 8) == "!x-files" && ready == true) {
        ready = false;
        playMisc(message, 'x-files')
      } else if (message.content.substring(0, 9) == "!xp-start" && ready == true) {
        ready = false;
        playMisc(message, 'xp-start')
      } else if (message.content.substring(0, 7) == "!xp-end" && ready == true) {
        ready = false;
        playMisc(message, 'xp-end')
      } else if (message.content.substring(0, 8) == "!pinball" && ready == true) {
        ready = false;
        playMisc(message, 'pinball')
      } else if (message.content.substring(0, 8) == "!fma" && ready == true) {
        ready = false;
        let str;
        fmaBool ? str = "fma" + 1 : str = "fma" + 2
        fmaBool = !fmaBool
        console.log(str)
        playMisc(message, str)
      } else if (message.content.substring(0, 9) == "!help" && ready == true) {
        let aoebotChannel = client.channels.get('392199619758784523')
        aoebotChannel.send("The commands available are !aoe [number between 1 and 42], !wololo, !ps1, !ps2, !law, !is-only-game, !x-files, !xp-start, !xp-end and !pinball.")
      }
    }
  } catch (err) {
    console.log(err)
  }
})

function playMisc(message, filename) {
  let voiceChannel = message.member.voiceChannel
  if (message.member.voiceChannel == null) {
    message.channel.send('Get in vc ya scrub')
  } else {
    voiceChannel
      .join()
      .then(connection => {
        const dispatcher = connection.playFile(miscSounds[filename])
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
  ready = true
}

function playstation(message, num) {
  let voiceChannel = message.member.voiceChannel
  if (message.member.voiceChannel == null) {
    message.channel.send('Get in vc ya scrub')
  } else {
    voiceChannel
      .join()
      .then(connection => {
        const dispatcher = connection.playFile(playstationSounds[num])
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
  ready = true
}

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
    const attachment = new Attachment('./wololo.png')
    message.channel.send(attachment)
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

  }
  ready = true
}

client.login(token);