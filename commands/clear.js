const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear un nombre de messages')
        .addIntegerOption(option =>option.setName('nombre').setDescription('Nombre de messages à supprimer').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    run: async (client, interaction) => {
        // mets un try catch pour éviter les erreurs
        try {

            const number = interaction.options.getInteger('nombre')
            // si le nombre est inférieur à 1 ou supérieur à 100, on envoie un message
            if (number < 1 || number > 100) return interaction.reply({ content: 'Le nombre doit être compris entre 1 et 100', ephemeral: true })
            // on supprime le nombre de messages
            await interaction.channel.bulkDelete(number)
            // on envoie un message de confirmation
            interaction.reply({ content: `J'ai supprimé ${number} messages`, ephemeral: true })
        } catch (error) {
            // si une erreur survient, on envoie un message
            interaction.reply({ content: `Une erreur est survenue\n\n${error}`, ephemeral: true })
        }
    }

}