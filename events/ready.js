const { ActivityType, ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { color, colorMod } = require('../data/embed');
const { autoroleChannelId, memberCountChannelId, boostCountChannelId } = require('../data/channels');
const { news, pickaxe, boost } = require('../data/emojis');
const { maskfr } = require('../data/serveurs');
const eco = require('../db');

module.exports = {
    name: 'ready',
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        // set a function to update the member count every 15 seconds
        setInterval(() => {
            const memberCount = client.guilds.cache.get(maskfr).memberCount;
            const boostCount = client.guilds.cache.get(maskfr).premiumSubscriptionCount;
            client.user.setActivity(`${memberCount} Membres`, { type: ActivityType.Watching });
            client.channels.cache.get(memberCountChannelId).setName(`👥 | Membres : ${memberCount}`);
            client.channels.cache.get(boostCountChannelId).setName(`🔥 | Boosts : ${boostCount}`);
        }, 15000);



        // add the maskfr id in the table "ecoServer" if it doesn't exist
        eco.get(`SELECT * FROM ecoServer WHERE idServer = '${maskfr}'`, async (err, row) => {
            if (err) throw err;
            if (!row) {
                eco.run(`INSERT INTO ecoServer (idServer, moneyServer) VALUES ('${maskfr}', 0)`);
            }
        });


        // const embed = new EmbedBuilder()
        //     .setAuthor({ name: `🎭 Choisissez vos rôles` })
        //     .setDescription(`Pour choisir vos rôles, réagissez avec les emojis correspondant.\nVous pouvez choisir plusieurs rôles.\n
        //     ${news} - Notif Annonces}
        //     ${pickaxe} - Notif Minecraft
        //     ${boost} - Notif Giveaways`)
        //     .setColor(colorMod)
        //     .setTimestamp()
        //     .setFooter({ text: `MaskFR` })

        // const button0 = new ButtonBuilder()
        //     .setCustomId('annonces')
        //     .setStyle(ButtonStyle.Secondary)
        //     .setEmoji(news)
        // const button1 = new ButtonBuilder()
        //     .setCustomId('giveaways')
        //     .setStyle(ButtonStyle.Secondary)
        //     .setEmoji(boost)
        // const button2 = new ButtonBuilder()
        //     .setCustomId('minecraft')
        //     .setStyle(ButtonStyle.Secondary)
        //     .setEmoji(pickaxe)
        // const actionRow = new ActionRowBuilder()
        //     .addComponents(button0, button1, button2)

        // client.channels.cache.get(autoroleChannelId).messages.fetch().then(messages => {
        //     if (messages.size >= 1) {
        //         client.channels.cache.get(autoroleChannelId).bulkDelete(messages)
        //         client.channels.cache.get(autoroleChannelId).send({ embeds: [embed], components: [actionRow] })
        //     } else {
        //         client.channels.cache.get(autoroleChannelId).send({ embeds: [embed], components: [actionRow] })
        //     }
        // })
    }
}