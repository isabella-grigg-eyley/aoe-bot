// discord config and modules
const
	{
		Client
	} = require('discord.js');
const client = new Client();

// auth

require('dotenv').config();
const token = process.env.TOKEN;

// local vars

let ready = true;

// functions

const
	{
		SendStartupMessage,
		AOEMP3s,
		Wololo,
		Playstation,
		PlayMisc,
		PlayFma,
		SendHelp
	} = require('./commands');


client.on('ready', () =>
{
	console.log('ready!');
	//SendStartupMessage(client)
});

client.on('message', message =>
{
	try
	{
		if (!ready) console.log("Message received but still waiting to finish previous command");
		
		if (message.content.substring(0, 1) === '!' && ready)
		{
			let cmd = GrabInitCommand(message.content);
			
			switch (cmd)
			{
				case 'help':
					ready = false;
					SendHelp(message, SetReadyTrue);
					break;
				case 'aoe':
					ready = false;
					AOEMP3s(message, SetReadyTrue);
					break;
				case 'wololo':
					ready = false;
					Wololo(message, SetReadyTrue);
					break;
				case 'fma':
					ready = false;
					PlayFma(message, SetReadyTrue);
					break;
				case 'ps1':
				case 'ps2':
					ready = false;
					Playstation(message, SetReadyTrue);
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
					ready = false;
					PlayMisc(message, SetReadyTrue);
					break;
				default:
					console.log(`invalid command detected: ${cmd}`);
					SetReadyTrue();
					break;
			}
		}
	}
	catch (err)
	{
		console.log(`ERROR: ${err}`);
		SetReadyTrue();
	}
});

function SetReadyTrue()
{
	ready = true;
}

function GrabInitCommand(cmd)
{
	let spaceIdx = cmd.indexOf(' ');
	if (spaceIdx > -1)
		cmd = cmd.substring(1, spaceIdx);
	else
		cmd = cmd.substring(1);
	return cmd;
}

client.login(token);