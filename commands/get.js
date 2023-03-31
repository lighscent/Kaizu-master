const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const data = require('../data/data');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get')
        .setDescription('Permet de récupérer une valeur dans les fichiers dans le dossier data')
        .addStringOption(option => option.setName('file').setDescription('Le fichier dans lequel vous voulez récupérer une valeur')
        .addChoices(
            { name: `channels`, value: `channels` },
            { name: `colors`, value: `colors ` },
            { name: `emojis`, value: `emojis` },
            { name: `roles`, value: `roles` },
            { name: `words`, value: `words` },
        ).setRequired(true))
        .addStringOption(option => option.setName('value').setDescription('La valeur que vous voulez récupérer').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    run: async (client, interaction) => {
        const file = interaction.options.getString('file');
        const value = interaction.options.getString('value');

        const data = require(`../data/${file}`);

        const result = data[value];

        if (!result) {
            const embed = new EmbedBuilder()
                .setTitle(`${data.emojis.beta} Valeur introuvable`)
                .setDescription(`> **${value}** return \`${result}\``)
                .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
            interaction.reply({ embeds: [embed] });
        }

        const embed = new EmbedBuilder()
            .setTitle(`${data.emojis.beta} Valeur trouvé`)
            .setDescription(`> **${value}** return \`${result}\``)
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
        interaction.reply({ embeds: [embed] });

    }
}