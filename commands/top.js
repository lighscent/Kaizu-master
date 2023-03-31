const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { data } = require('../data/data');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('top')
        .setDescription('Affiche le top 10 des utilisateurs'),

    run: async (client, interaction) => {
        // 

        interaction.reply({ embeds: [embed] })

    }
}