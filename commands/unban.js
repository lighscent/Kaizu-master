const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { data } = require('../data/data');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('MOD - Unban un utilisateur via son ID')
        .addStringOption(option => option.setName('id').setDescription('L\'ID de l\'utilisateur à unban').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    run: async (client, interaction) => {
        const id = interaction.options.getString('id');
        const embed = new EmbedBuilder()
            .setTitle('Modération - Unban')
            .setColor(data.colors.mod)
            .setTimestamp()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })

        if (id) {
            interaction.guild.members.unban(id)
                .then(() => {
                    interaction.reply({ content: `L'utilisateur <@${id}> a été unban avec succès !` });
                    embed.setDescription(`**Utilisateur unban:** <@${id}>\n**Modérateur:** <@${interaction.user.id}> (${interaction.user.id})`)
                    client.channels.cache.get(data.channels.logsId).send({ embeds: [embed] });
                })
                .catch(err => {
                    interaction.reply({ content: 'Je n\'ai pas pu unban cet utilisateur', ephemeral: true });
                    console.error(err);
                });
        } else {
            interaction.reply({ content: 'Vous devez mentionner un id', ephemeral: true });
        }
    }
}