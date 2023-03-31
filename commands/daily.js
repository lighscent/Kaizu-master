const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { data } = require("../data/data");
const randomDaily = require("../data/random");
const db = require('../db');
const moment = require('moment');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('ECO - Récupérez votre argent quotidien'),

    run: async (client, interaction) => {
        const random = randomDaily();

        if (interaction.channelId !== data.channels.ecoId) {
            const embed = new EmbedBuilder()
                .setColor(data.colors.eco)
                .setDescription(`Vous devez utiliser cette commande dans le channel ${ecoChannelId}`)
            interaction.reply({ embeds: [embed] });
        }

        db.get(`SELECT * FROM ecoUser WHERE idUser = '${interaction.user.id}'`, async (err, row) => {
            if (err) throw err;
            if (row) {
                if (row.cooldownDaily === 0) {
                    const embed = new EmbedBuilder()
                        .setColor(data.colors.eco)
                        .setDescription(`Vous avez reçu **${random}**`)
                    interaction.reply({ embeds: [embed] });
                    db.run(`UPDATE ecoUser SET moneyUser = ${row.moneyUser + random}, cooldownDaily = 86400000 WHERE idUser = '${interaction.user.id}'`);
                } else {
                    const embed = new EmbedBuilder()
                        .setColor(data.colors.eco)
                        .setDescription(`Vous devez attendre **${moment.duration(row.cooldownDaily).hours()}h ${moment.duration(row.cooldownDaily).minutes()}m ${moment.duration(row.cooldownDaily).seconds()}s**`)
                    interaction.reply({ embeds: [embed] });
                }
            }
        });
    }
}