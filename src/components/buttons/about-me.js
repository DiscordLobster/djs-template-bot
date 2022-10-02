const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'about-me',
    },
    // eslint-disable-next-line no-unused-vars
    async execute(interaction, client) {
        const embed = await interaction.message.embeds[0];

        const newEmbed = new EmbedBuilder()
            .setAuthor(embed.author)
            .setFooter(embed.footer)
            .setDescription('You clicked the About Me button!\n\nUnder construction');

        if (embed.color) newEmbed.setColor(embed.color);

        await interaction.update({ embeds: [newEmbed] });
    },
};