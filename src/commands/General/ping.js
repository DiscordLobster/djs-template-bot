const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const duration = require('dayjs/plugin/duration');
dayjs.extend(relativeTime);
dayjs.extend(duration);
const numeral = require('numeral');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('View the bot\'s ping and other related information'),
    async execute(interaction, client) {
        const memoryUsed = numeral(process.memoryUsage().heapUsed).format('0.0 b');
        const uptime = dayjs.duration(client.uptime, 'millisecond').humanize();

        await interaction.reply({ content: 'Pinging...', fetchReply: true }).then(msg => {
            msg.edit({ content: `API Latency: ${client.ws.ping}ms\nUptime: ${uptime}\nMemory Used: ${memoryUsed}` });
        });
    },
};