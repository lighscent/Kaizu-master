const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { colorEco } = require('../data/embed');
const db = require('../db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bal')
        .setDescription('Affiche votre argent'),


    run: async (client, interaction) => {
        // get the moneyUser of the user in the table "ecoUser" and send it in an embed
        db.get(`SELECT * FROM ecoUser WHERE idUser = '${interaction.user.id}'`, async (err, row) => {
            if (err) throw err;
            if (row) {
                const embed = new EmbedBuilder()
                    .setColor(colorEco)
                    .setDescription(`Vous avez **${row.moneyUser}**`)
                interaction.reply({ embeds: [embed] });
            }
        });
    }
}