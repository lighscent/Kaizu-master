const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { data } = require('../data/data');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('Affiche le shop'),

    run: async (client, interaction) => {
        const embedShop = new EmbedBuilder()
            .setAuthor({ name: `Shop - MaskFR | Official` })
            .setDescription(`Les items présent dans le shop ne sont achetable qu'avec de l'argent du bot.`)
            .addFields(
                { name: `Key Basic x1`, value: `500$` }
                )
            .setColor(data.colors.eco)
            .setTimestamp()
            .setFooter({ text: `MaskFR | Official` })

        interaction.reply({ embeds: [embedShop] })
    }
}

