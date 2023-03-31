const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { data } = require('../data/data')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('version')
        .setDescription('Affiche les ajouts des versions')
        .addStringOption(option => option.setName('version').setDescription('Version du bot').setRequired(true).addChoices(
            { name: 'v2.0.0 à v2.0.9', value: '2.0.0' },
        )),
        
    run: async (client, interaction) => {
        const version = interaction.options.getString('version');

        const embed = new EmbedBuilder()
            .setTitle(`Version ${version}`)
            .setColor(data.colors.base)
            .setTimestamp()

        if (version === '2.0.0') {
            embed.setDescription(`
            **v2.0.0** - *31 Mars 2023 11h39*
            ${data.emojis.on} Mise en place du repo github pour les issues et les releases
            ${data.emojis.idle} Optimisation des datas visant à réduire la consommation de RAM et de CPU
            
            **v2.0.1** - *31 Mars 2023 11h40*
            ${data.emojis.on} Ajout \`/issue\` pour signaler un bug
            ${data.emojis.on} Ajout \`/release\` pour afficher la dernière release du bot
            ${data.emojis.on} Ajout \`/version\` pour afficher les ajouts des versions
            ${data.emojis.idle} Patch d'un bug lors d'ajout d'un 5ème choix \`/sondage choix\`
            ${data.emojis.dnd} Retrait de l'anti prefix dans les messages pour éviter les bugs`)
        }

        interaction.reply({ embeds: [embed] })
    }
}