require('dotenv').config();
const { readdirSync } = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Local caches for the bot components
client.commands = new Collection();
client.buttons = new Collection();
client.menus = new Collection();
client.modals = new Collection();

// Switch statement to require various functions
const functionFolders = readdirSync('./src/functions');
for (const folder of functionFolders) {
  const functionFiles = readdirSync(`./src/functions/${folder}`).filter(
    (file) => file.endsWith('.js'),
  );
  switch (folder) {
    case 'client':
      for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
      }
      break;

    default:
      break;
  }
}

// Go to './src/functions/client/syncCommands.js' to learn more
client.syncCommands();

// Go to './src/functions/client/handleEvents.js' to learn more
client.handleEvents();

// Puts the bot matching the token into an online state
client.login(process.env.BOT_TOKEN);
