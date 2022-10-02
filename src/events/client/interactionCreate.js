const { createWriteStream } = require('fs');
const logger = createWriteStream('./src/logs/commands.txt', { flags: 'a' });
// const buttonLogger = createWriteStream('./src/logs/buttons.txt', { flags: 'a' });
// const menuLogger = createWriteStream('./src/logs/menus.txt', { flags: 'a' });
// const modalLogger = createWriteStream('./src/logs/modals.txt', { flags: 'a' });
const dayjs = require('dayjs');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        const { commands, buttons, menus, modals } = client;
        const { commandName, customId } = interaction;
        const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');

        if (interaction.isCommand()) {
            const command = commands.get(commandName);
            if (!command) return interaction.reply({ content: 'No code was found for this command!' });

            try {
                await command.execute(interaction, client);
                logger.write(`[${dateFormat}] ${interaction.user.tag} used /${commandName} in #${interaction.channel.name}\n`);
            }
            catch (err) {
                console.error(err);
                if (interaction.isRepliable()) {
                    return interaction.reply({ content: `${err}` }) || interaction.editReply({ content: `${err}` });
                }
                else {
                    return interaction.followUp({ content: `${err}` });
                }
            }
        }
        else if (interaction.isButton()) {
            const button = buttons.get(customId);
            if (!button) return interaction.update({ content: 'No code for this button was found!' });

            try {
                await button.execute(interaction, client);
                // buttonLogger.write('some message');
            }
            catch (err) {
                console.error(err);
                if (interaction.isRepliable()) {
                    return interaction.reply({ content: `${err}` }) || interaction.editReply({ content: `${err}` });
                }
                else {
                    return interaction.update({ content: `${err}` });
                }
            }
        }
        else if (interaction.isSelectMenu()) {
            const menu = menus.get(customId);
            if (!menu) return interaction.update({ content: 'No code for this menu was found!' });

            try {
                await menu.execute(interaction, client);
                // menuLogger.write('some message');
            }
            catch (err) {
                console.error(err);
                if (interaction.isRepliable()) {
                    return interaction.reply({ content: `${err}` }) || interaction.editReply({ content: `${err}` });
                }
                else {
                    return interaction.update({ content: `${err}` });
                }
            }
        }
        else if (interaction.isModalSubmit()) {
            const modal = modals.get(customId);
            if (!modal) return interaction.update({ content: 'No code for this modal was found!' });

            try {
                await modal.execute(interaction, client);
                // modalLogger.write('some message');
            }
            catch (err) {
                console.error(err);
                if (interaction.isRepliable()) {
                    return interaction.reply({ content: `${err}` }) || interaction.editReply({ content: `${err}` });
                }
                else {
                    return interaction.update({ content: `${err}` });
                }
            }
        }
        else if (interaction.isContextMenuCommand()) {
            //
        }
    },
};