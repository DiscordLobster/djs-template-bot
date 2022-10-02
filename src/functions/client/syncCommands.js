const { readdirSync } = require('fs');

module.exports = (client) => {
    const { commands } = client;
    client.syncCommands = () => {
        const commandFolders = readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                console.log('Synced %d to command cache', command.data.name);
            }
        }

        console.log('Synced %d commands in total', commands.size);
    };
};