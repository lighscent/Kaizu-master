const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('UTILS - Ajoute un rôle à un utilisateur ou tout les utilisateurs')
        .addRoleOption(option => option.setName('role').setDescription('Le rôle à ajouter').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

    run: async(client, interaction) => {
        const role = interaction.options.getRole('role');

        // get all members
        const members = await interaction.guild.members.fetch();
        // if member has role, skip
        // else add role
        members.forEach(member => {
            if(member.roles.cache.has(role.id)) return;
            member.roles.add(role);
        })
    }
}