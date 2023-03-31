const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const data = require('../data/data');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('MOD - Ban un utilisateur')
        .addUserOption(option => option.setName('utilisateur').setDescription('L\'utilisateur à bannir').setRequired(true))
        .addStringOption(option => option.setName('raison').setDescription('La raison du ban').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    run: async (client, interaction) => {
        const user = interaction.options.getUser('utilisateur');
        const reason = interaction.options.getString('raison') || 'Aucune raison';
        const embed = new EmbedBuilder()
            .setTitle('Modération - Ban')
            .setColor(data.colors.mod)
            .setTimestamp()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })


        if (user) {
            const member = interaction.guild.members.cache.get(user.id);
            if (member) {
                member
                    .ban({
                        reason: reason,
                    })
                    .then(() => {
                        interaction.reply({ content: `L'utilisateur <@${user.id}> a été banni avec succès !`});
                        embed.setDescription(`**Utilisateur banni:** <@${user.id}> (${user.id})\n**Modérateur:** <@${interaction.user.id}> (${interaction.user.id})\n**Raison:** ${reason}`)
                        client.channels.cache.get(data.channels.logsId).send({ embeds: [embed] });
                    })
                    .catch(err => {
                        interaction.reply({ content: 'Je n\'ai pas pu bannir cet utilisateur', ephemeral: true });
                        console.error(err);
                    });
            } else {
                interaction.reply({ content: 'Cet utilisateur n\'est pas dans le serveur', ephemeral: true });
            }
        } else {
            interaction.reply({ content: 'Vous devez mentionner un utilisateur', ephemeral: true });
        }
    }
}