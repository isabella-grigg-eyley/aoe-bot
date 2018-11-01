// discord config and modules
const {
  Client
} = require('discord.js')
const client = new Client()

// auth

require('dotenv').config()
const token = process.env.TOKEN

// local vars

let ready = true

// functions

const {
  sendStartupMessage,
  aoeMp3s,
  wololo,
  playstation,
  playMisc,
  playFma,
  sendHelp
} = require('./commands')


client.on('ready', () => {
  console.log('ready!')
  //sendStartupMessage(client)
})

client.on('message', message => {
  try {
    if (message.content.substring(0, 1) === '!' && ready) {
      let cmd = grabInitCommand(message.content)
      switch (cmd) {
        case 'help':
          ready = false
          sendHelp(message, setReadyTrue)
          break;
        case 'aoe':
          ready = false
          aoeMp3s(message, setReadyTrue)
          break;
        case 'wololo':
          ready = false
          wololo(message, setReadyTrue)
          break;
        case 'fma':
          ready = false
          playFma(message, setReadyTrue)
          break;
        case 'ps1':
        case 'ps2':
          ready = false
          playstation(message, setReadyTrue)
          break;
        case 'law':
        case 'is-only-game':
        case 'x-files':
        case 'xp-start':
        case 'xp-end':
        case 'pinball':
        case 'adum':
        case 'deathnote':
          ready = false
          playMisc(message, setReadyTrue)
          break;
        default:
          console.log(`invalid command detected: ${cmd}`)
          break;
      }
    }
  } catch (err) {
    console.log(`ERROR: ${err}`)
  }
})

// } else if (message.content.substring(0, 8) == "!fma" && ready == true) {
//   ready = false;
//   let str;
//   fmaBool ? str = "fma" + 1 : str = "fma" + 2
//   fmaBool = !fmaBool
//   console.log(str)
//   playMisc(message, str)
// } else if (message.content.substring(0, 9) == "!help" && ready == true) {
//   let aoebotChannel = client.channels.get('392199619758784523')
//   aoebotChannel.send("The commands available are !aoe [number between 1 and 42], !wololo, !ps1, !ps2, !law, !is-only-game, !x-files, !xp-start, !xp-end and !pinball.")
// }

function setReadyTrue() {
  ready = true
}

function grabInitCommand(cmd) {
  let spaceIdx = cmd.indexOf(' ')
  if (spaceIdx > -1) {
    cmd = cmd.substring(1, spaceIdx)
  } else cmd = cmd.substring(1)
  return cmd
}

client.login(token);