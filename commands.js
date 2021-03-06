// discord config and modules
const
	{
		Attachment
	} = require('discord.js');

// data refs

const startupCommands = require('./misc-fx/startups');
const aoeMp3sData = require('./sfx/aoe-mp3s.json');
const playstationSounds = require('./sfx/playstation.json');
const miscSounds = require('./sfx/misc.json');

//local vars

let fmaBool = true;


function SendStartupMessage(client)
{
	let aoebotChannel = client.channels.get('392199619758784523');
	let rand = Math.floor(Math.random() * 3);
	aoebotChannel.send(startupCommands[rand]);
}

function PlayFile(message, filename, cb)
{
	let voiceChannel = message.member.voiceChannel;
	
	if (message.member.voiceChannel == null)
	{
		message.channel.send('Get in vc ya scrub');
		return;
	}
	
	// If we can't speak in the channel, bail
	if (!message.member.voiceChannel.speakable)
	{
		console.log('Error: The voice channel the user is in is not Speakable for me.');
		return;
	}
	
	// Everything's fine, so connect to the voice channel and send file
	voiceChannel
		.join()
		.then(connection =>
		{
			const dispatcher = connection.playFile(filename);
			dispatcher.on('end', end =>
			{
				voiceChannel.leave();
				cb();
			});
		})
		.catch(err =>
		{
			message.channel.send('AOE bot has resigned');
			console.log(err);
			voiceChannel.leave();
			cb();
		});
}

function PlayMisc(message, cb)
{
	let filename = message.content.split(' ')[0].substring(1);
	PlayFile(message, miscSounds[filename], cb);
}

function Playstation(message, cb)
{
	let num = message.content.substring(3, 4);
	PlayFile(message, playstationSounds[num], cb);
}

function AOEMP3s(message, cb)
{
	let args = message.content.split(' ');
	let cmd = Number(args[1]);
	if (cmd <= 42 && cmd > 0)
		PlayFile(message, aoeMp3sData[cmd], cb);
	else
		cb();
}

function Wololo(message, cb)
{
	const attachment = new Attachment('./misc-fx/wololo.png');
	message.channel.send(attachment);
	PlayFile(message, aoeMp3sData[30], cb);
}

function PlayFma(message, cb)
{
	let str;
	fmaBool ? str = "fma" + 1 : str = "fma" + 2;
	fmaBool = !fmaBool;
	PlayFile(message, miscSounds[str], cb);
}

function SendHelp(message, cb)
{
	message.channel.send('**Hello!**\nThe commands available are:\n\n!aoe *[number between 1 and 42]*\n!wololo\n!fma\n!ps1\n!ps2\n!law\n!is-only-game\n!x-files\n!xp-start\n!xp-end\n!pinball\n!adum\n!deathnote\n!halloween\n!help');
	cb();
}

module.exports =
	{
		SendStartupMessage: SendStartupMessage,
		AOEMP3s: AOEMP3s,
		Wololo: Wololo,
		Playstation: Playstation,
		PlayMisc: PlayMisc,
		PlayFma: PlayFma,
		SendHelp: SendHelp
	};