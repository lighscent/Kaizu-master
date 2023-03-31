const { ActivityType } = require('discord.js');
const { data } = require('../data/data');
const eco = require('../db');

module.exports = {
    name: 'ready',
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);

        const maskfr = data.server.maskfr;
        const memberCountChannelId = data.channels.memberCountId;
        const boostCountChannelId = data.channels.boostCountId;

        setInterval(() => {
            const memberCount = client.guilds.cache.get(maskfr).memberCount;
            const boostCount = client.guilds.cache.get(maskfr).premiumSubscriptionCount;
            client.user.setActivity(`${memberCount} Membres`, { type: ActivityType.Watching });
            client.channels.cache.get(memberCountChannelId).setName(`👥 | Membres : ${memberCount}`);
            client.channels.cache.get(boostCountChannelId).setName(`🔥 | Boosts : ${boostCount}`);
        }, 15000);



        eco.get(`SELECT * FROM ecoServer WHERE idServer = '${maskfr}'`, async (err, row) => {
            if (err) throw err;
            if (!row) {
                eco.run(`INSERT INTO ecoServer (idServer, moneyServer) VALUES ('${maskfr}', 0)`);
            }
        });
    }
}