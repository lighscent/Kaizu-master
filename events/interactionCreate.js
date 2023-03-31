const { InteractionType, EmbedBuilder } = require('discord.js');
const { readdirSync } = require('fs');
const { annonces, minecraft, giveaways } = require('../data/roles');
const { color } = require('../data/embed');
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
                    .setColor(color)
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



        const embed = new EmbedBuilder()
            .setColor(color)
        if (interaction.isButton()) {
            if (interaction.user.bot) return;
            if (interaction.customId == 'minecraft') {
                if (interaction.member.roles.cache.has(minecraft)) {
                    interaction.member.roles.remove(minecraft);
                    embed.setDescription(`Vous avez bien été retiré du rôle **Minecraft** !`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                } else {
                    interaction.member.roles.add(minecraft);
                    embed.setDescription(`Vous avez bien été ajouté au rôle **Minecraft** !`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }
            if (interaction.customId == 'annonces') {
                if (interaction.member.roles.cache.has(annonces)) {
                    interaction.member.roles.remove(annonces);
                    embed.setDescription(`Vous avez bien été retiré du rôle **Annonces** !`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                } else {
                    interaction.member.roles.add(annonces);
                    embed.setDescription(`Vous avez bien été ajouté au rôle **Annonces** !`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }
            if (interaction.customId == 'giveaways') {
                if (interaction.member.roles.cache.has(giveaways)) {
                    interaction.member.roles.remove(giveaways);
                    embed.setDescription(`Vous avez bien été retiré du rôle **Giveaways** !`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                } else {
                    interaction.member.roles.add(giveaways);
                    embed.setDescription(`Vous avez bien été ajouté au rôle **Giveaways** !`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }
        }
    }
}