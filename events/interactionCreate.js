const { InteractionType, EmbedBuilder } = require('discord.js');
const { readdirSync } = require('fs');
const { data } = require('../data/data');
const db = require('../db');

module.exports = {
    name: 'interactionCreate',

    async execute(interaction) {
        // add the id of the user in the table "ecoUser" if it doesn't exist
        // if it doesn't exist, defer the interaction and send an error message
        db.get(`SELECT * FROM ecoUser WHERE idUser = '${interaction.user.id}'`, async (err, row) => {
            if (err) throw err;
            if (!row) {
                db.run(`INSERT INTO ecoUser (idUser, moneyUser, cooldownDaily) VALUES ('${interaction.user.id}', 0, 0)`);
                const embed = new EmbedBuilder()
                    .setColor(data.colors.base)
                    .setDescription(`Création de votre profil en cours...`)
                interaction.reply({ embeds: [embed], ephemeral: true });
            }
        });

        let client = interaction.client;


        if (interaction.type == InteractionType.ApplicationCommand) {
            if (interaction.user.bot) return;

            readdirSync('./commands').forEach(file => {
                const command = require(`../commands/${file}`);
                if (interaction.commandName.toLowerCase() === command.data.name.toLowerCase()) {
                    // if useEco is true, use the command only in ecoChannelId


                    command.run(client, interaction)
                }
            })
        }
    }
}