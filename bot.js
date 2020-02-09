// discord config and modules
const
{
  Client
} = require('discord.js')
const client = new Client()

// auth

require('dotenv').config()
const token = process.env.TOKEN

// local vars

let ready = true

// functions

const
{
  sendStartupMessage,
  aoeMp3s,
  wololo,
  playstation,
  playMisc,
  playFma,
  sendHelp
} = require('./commands')


client.on('ready', () => 
{
  console.log('ready!')
  //sendStartupMessage(client)
})

client.on('message', message => 
{
  try
  {
    if (!ready) console.log("Message received but still waiting to finish previous command")
    
    if (message.content.substring(0, 1) === '!' && ready)
    {
      let cmd = grabInitCommand(message.content)
      
      switch (cmd)
      {
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
        case 'halloween':
          ready = false
          playMisc(message, setReadyTrue)
          break;
        default:
          console.log(`invalid command detected: ${cmd}`)
          setReadyTrue()
          break;
      }
    }
  }
  catch (err)
  {
    console.log(`ERROR: ${err}`)
    setReadyTrue()
  }
})

function setReadyTrue()
{
  ready = true
}

function grabInitCommand(cmd)
{
  let spaceIdx = cmd.indexOf(' ')
  if (spaceIdx > -1)
    cmd = cmd.substring(1, spaceIdx)
  else
    cmd = cmd.substring(1)
  return cmd
}

client.login(token);