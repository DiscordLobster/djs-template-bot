'use strict';

require('dotenv').config();
const { readdirSync } = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Local caches for the bot components
client.commands = new Collection();
client.buttons = new Collection();
client.menus = new Collection();
client.modals = new Collection();

// Read the functions directory in a synchronous order
const functionFolders = readdirSync('./src/functions');

// Create a for..loop for each folder in the directory
for (const folder of functionFolders) {
  // Filter the functions down to js files
  const functionFiles = readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));

  // Create a switch statement for each folder in the functions directory
  switch (folder) {
    case 'client':
      // For each file in 'functions/client' it'll require the module with the client attached as a property
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

// Go to './src/functions/client/syncComponents.js' to learn more
client.syncComponents();

// Puts the bot matching the token into an online state
client.login(process.env.BOT_TOKEN);
