const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { color } = require("../data/embed");

module.exports = { 
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Affiche la latence du bot"),
    
    run: async (client, interaction) => {
        const embed = new EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024})})
            .setDescription(`Latence du bot et de l'API`) 
            .addFields(
                { name: `Latence du bot 🤖`, value: `\`${client.ws.ping}ms\``},
                { name: `Latence de l'API 🛰️`, value: `\`${interaction.createdTimestamp - Date.now()}ms\``}
            )
            .setColor(color)
            .setTimestamp()
            .setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 1024})})
        interaction.reply({ embeds: [embed] })
    }
};