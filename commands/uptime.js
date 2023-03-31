const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')
const { color } = require('../data/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Affiche le temps de fonctionnement du bot'),

    run: async (client, interaction) => {
        try {
            const uptime = client.uptime
            const days = Math.floor(uptime / 86400000)
            const hours = Math.floor(uptime / 3600000) % 24
            const minutes = Math.floor(uptime / 60000) % 60
            const seconds = Math.floor(uptime / 1000) % 60

            const embed = new EmbedBuilder()
                .setTitle('Uptime')
                .setDescription(`Le bot est en ligne depuis ${days} jours, ${hours} heures, ${minutes} minutes et ${seconds} secondes`)
                .setColor(color)
                .setTimestamp()
                
            interaction.reply({ embeds: [embed] })
        } catch (error) {
            interaction.reply({ content: `Une erreur est survenue\n\n${error}`, ephemeral: true })
        }
    }
}