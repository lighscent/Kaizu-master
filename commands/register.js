const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const db = require('../db')
const { data } = require('../data/data')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('GAME - Register your account to play on the server')
        .addStringOption(option => option.setName('pseudo').setDescription('Votre pseudo').setRequired(true))
        .addStringOption(option => option.setName('password').setDescription('Mot de passe').setRequired(true))
        .addStringOption(option => option.setName('confirmpassword').setDescription('Confirmation du mot de passe').setRequired(true)),

    run: async (client, interaction) => {
        const pseudo = interaction.options.getString('pseudo');
        const password = interaction.options.getString('password');
        const confirmpassword = interaction.options.getString('confirmpassword');

        if (pseudo.length < 3) {
            const embed = new EmbedBuilder()
                .setColor(data.colors.base)
                .setDescription(`Votre pseudo doit contenir au moins 3 caractères !`)
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (password.length > 16) {
            const embed = new EmbedBuilder()
                .setColor(data.colors.base)
                .setDescription(`Votre mot de passe doit contenir moins de 16 caractères !`)
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (password != confirmpassword) {
            const embed = new EmbedBuilder()
                .setColor(data.colors.base)
                .setDescription(`Les mots de passe ne correspondent pas !`)
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        // add the user in the table accountUser if he doesn't exist 
        db.get(`SELECT * FROM accountUser WHERE idAccountUser = '${interaction.user.id}'`, async (err, row) => {
            if (err) throw err;
            if (!row) {
                db.run(`INSERT INTO accountUser (idAccountUser, pseudoUser, passwordUser) VALUES ('${interaction.user.id}', '${pseudo}', '${password}')`);
                const embed = new EmbedBuilder()
                    .setColor(data.colors.base)
                    .setDescription(`Votre compte a bien été créé !`)
                interaction.reply({ embeds: [embed] });
            } else {
                const embed = new EmbedBuilder()
                    .setColor(data.colors.base)
                    .setDescription(`Vous avez déjà un compte !`)
                interaction.reply({ embeds: [embed] });
            }
        })
    }
}