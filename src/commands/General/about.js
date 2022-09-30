const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const package = require('../../../package.json');

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('View various information about the bot'),
    async execute(interaction, client) {
        const clientMember = await interaction.guild.members.fetch(client.user.id);
        const developer = await client.users.fetch(process.env.DEV_ID);

        const b1 = new ButtonBuilder()
            .setCustomId('about-me')
            .setLabel('Me')
            .setStyle(ButtonStyle.Primary);
        const b2 = new ButtonBuilder()
            .setCustomId('about-features')
            .setLabel('Features')
            .setStyle(ButtonStyle.Primary);
        const b3 = new ButtonBuilder()
            .setCustomId('about-stats')
            .setLabel('Stats')
            .setStyle(ButtonStyle.Primary);
        const row = new ActionRowBuilder().setComponents(b1, b2, b3);

        const embed = new EmbedBuilder()
            .setAuthor({ name: client.user.tag, iconURL: clientMember.displayAvatarURL(true) })
            .setColor(clientMember.displayColor)
            .setFooter({ text: `v${package.version} | Developer: ${developer.tag}`, iconURL: developer.displayAvatarURL(true) })
            .setDescription('Please use the buttons below to navigate through the about command! This is a test command to edit and change as you please!')
            .addFields([
                {
                    name: 'Inline Field 1',
                    value: 'The \'Me\' button is tied to the `about-me` custom ID! Look for it under `components/buttons`',
                    inline: true,
                },
                {
                    name: 'Inline Field 2',
                    value: 'The \'Features\' button has the `about-features` custom ID! You can also find it under `components/buttons`',
                    inline: true,
                },
                {
                    name: 'Inline Field 3',
                    value: 'The \'Stats\' button is under the `about-stats` custom ID! Like the others, you can find it under `components/buttons`',
                    inline: true,
                },
            ]);

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    },
};