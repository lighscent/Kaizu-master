const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const { data } = require('../data/data')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('issue')
        .setDescription('Permet de créer une issue sur le github du bot'),

    run: async (client, interaction) => {
        const url = "https://github.com/ItsAzukio/Kaizu-master/issues/new"

        const embed = new EmbedBuilder()
            .setDescription(`Create an issue on the bot's github`)
            .setColor(data.colors.base)
            .setTimestamp()
        const button = new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel(`Create an issue`)
            .setURL(`${url}`)

        const row = new ActionRowBuilder()
            .addComponents(button)

        interaction.reply({ embeds: [embed], components: [row] })
    }
}