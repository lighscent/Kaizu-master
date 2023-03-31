const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report un joueur'),

    run: async (interaction) => {
        const modal = new ModalBuilder()
            .setCustomId('report')
            .setTitle("Panel de report Minecraft")

        const UserInput = new TextInputBuilder()
            .setCustomId('user')
            .setLabel("Utilisateur à report")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Pseudo')
            .setMaxLength(32)
            .setMinLength(3)
            .setRequired(true);

        const firstActionRow = new ActionRowBuilder().addComponents(UserInput);
        modal.addComponents(firstActionRow);

		await interaction.showModal(modal);
    }
}