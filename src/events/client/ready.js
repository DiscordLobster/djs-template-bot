module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Succcessfully logged in as ${client.user.tag}!`);
    },
};