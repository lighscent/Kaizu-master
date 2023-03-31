const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const data = require('../data/data');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banid')
        .setDescription('MOD - Ban un utilisateur via son ID')
        .addStringOption(option => option.setName('id').setDescription('L\'ID de l\'utilisateur à bannir').setRequired(true))
        .addStringOption(option => option.setName('raison').setDescription('La raison du ban').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    run: async (client, interaction) => {
        const id = interaction.options.getString('id');
        const reason = interaction.options.getString('raison') || 'Aucune raison';
        const embed = new EmbedBuilder()
            .setTitle('Modération - Ban Id')
            .setColor(data.colors.mod)
            .setTimestamp()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })

        if (id) {
            interaction.guild.members.ban(id, { reason: reason })
                .then(() => {
                    interaction.reply({ content: `L'utilisateur <@${id}> a été banni avec succès !` });
                    embed.setDescription(`**Utilisateur banni:** <@${id}>\n**Modérateur:** <@${interaction.user.id}> (${interaction.user.id})\n**Raison:** ${reason}`)
                    client.channels.cache.get(data.channels.logsId).send({ embeds: [embed] });
                })
                .catch(err => {
                    interaction.reply({ content: 'Je n\'ai pas pu bannir cet utilisateur', ephemeral: true });
                    console.error(err);
                });
        } else {
            interaction.reply({ content: 'Vous devez mentionner un id', ephemeral: true });
        }
    }
}