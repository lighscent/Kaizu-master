const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { data } = require('../data/data');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('release')
        .setDescription('Permet de download la dernière version du bot'),

    run: async (client, interaction) => {
        const repoUrl = "https://api.github.com/repos/ItsAzukio/Kaizu-master/releases/latest";

        try {
            const response = await fetch(repoUrl);
            const json = await response.json();
            const releaseUrl = json.html_url;

            // get the name of the release
            const releaseName = json.name;


            const embed = new EmbedBuilder()
                .setDescription(`Download the last version of the bot`)
                .setColor(data.colors.base)
                .setTimestamp()
            const button = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel(`${releaseName}`)
                .setURL(`${releaseUrl}`)

            const row = new ActionRowBuilder()
                .addComponents(button)

            interaction.reply({ embeds: [embed], components: [row] })
        } catch (err) {
            console.error(err);
            const embed = new EmbedBuilder()
                .setDescription(`An error has occurred`)
                .setColor(data.colors.base)
                .setTimestamp()

            interaction.reply({ embeds: [embed] })
        }
    }
}