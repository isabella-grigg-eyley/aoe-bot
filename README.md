# AOE-Bot

This is a Discord bot, here to provide quality content for your Discord server.

## Setup

You will need:

* Node.js (https://nodejs.org/en/)
* ffmpeg (http://blog.gregzaal.com/how-to-install-ffmpeg-on-windows/)
* Python (https://www.python.org/downloads/)

After cloning this repo down, run:

```
npm install
```

Next you'll need to setup authentication credentials. You will need a Discord account if you don't have one already. 

1. Go to https://discordapp.com/developers/applications/ and create a new application.
2. Next, navigate to the Bots section from the righthand nav bar and make a new bot. Give it a name and an icon!
3. Let's add the bot to your server. Back in the General Information tab, look for the Client ID number. In your browser, go to https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=8, replacing CLIENTID with the number given there.
4. Now you just need the authentication working. If you go back to the Bots page, you should see a Click To Reveal Token link. Hit that and copy the token. *Don't share this token with anyone else!*
5. In the folder you cloned down, make a new file called '.env'. In it, add this line:
```
TOKEN=[your token pasted here]
```
and save that.
6. Your bot should be ready to go! In the command line in the bot folder, run
```
node bot.js
```
and you should see your bot appear in the server. You can also run
```
npx nodemon bot.js
```
to run your bot so it will update every time you change the code if you want to add more features.

------------

That's it, have fun!

------------
