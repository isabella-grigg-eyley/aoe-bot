// discord config and modules
const
{
  Attachment
} = require('discord.js')

// data refs

const startupCommands = require('./misc-fx/startups')
const aoeMp3sData = require('./sfx/aoe-mp3s.json')
const playstationSounds = require('./sfx/playstation.json')
const miscSounds = require('./sfx/misc.json')

//local vars

let fmaBool = true


function sendStartupMessage(client)
{
  let aoebotChannel = client.channels.get('392199619758784523')
  let rand = Math.floor(Math.random() * 3)
  aoebotChannel.send(startupCommands[rand])
}

function playFile(message, filename, cb)
{
  let voiceChannel = message.member.voiceChannel

  if (message.member.voiceChannel == null)
    message.channel.send('Get in vc ya scrub')

  else
  {
    voiceChannel
      .join()
      .then(connection => {
        const dispatcher = connection.playFile(filename)
        dispatcher.on('end', end => {
          voiceChannel.leave()
          cb()
        })
      })
      .catch(err => {
        message.channel.send('AOE bot has resigned')
        console.log(err)
        voiceChannel.leave()
        cb()
      })
  }

}

function playMisc(message, cb)
{
  let filename = message.content.split(' ')[0].substring(1)
  playFile(message, miscSounds[filename], cb)
}

function playstation(message, cb)
{
  let num = message.content.substring(3, 4)
  playFile(message, playstationSounds[num], cb)
}

function aoeMp3s(message, cb)
{
  let args = message.content.split(' ')
  let cmd = Number(args[1])
  if (cmd <= 42 && cmd > 0)
    playFile(message, aoeMp3sData[cmd], cb)
  else
    cb()
}

function wololo(message, cb)
{
  const attachment = new Attachment('./misc-fx/wololo.png')
  message.channel.send(attachment)
  playFile(message, aoeMp3sData[30], cb)
}

function playFma(message, cb)
{
  let str;
  fmaBool ? str = "fma" + 1 : str = "fma" + 2
  fmaBool = !fmaBool
  playFile(message, miscSounds[str], cb)
}

function sendHelp(message, cb)
{
  message.channel.send('**Hello!**\nThe commands available are:\n\n!aoe *[number between 1 and 42]*\n!wololo\n!fma\n!ps1\n!ps2\n!law\n!is-only-game\n!x-files\n!xp-start\n!xp-end\n!pinball\n!adum\n!deathnote\n!halloween\n!help')
  cb()
}

module.exports =
{
  sendStartupMessage,
  aoeMp3s,
  wololo,
  playstation,
  playMisc,
  playFma,
  sendHelp
}