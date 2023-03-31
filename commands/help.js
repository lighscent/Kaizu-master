const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { color, colorEco, colorMod } = require('../data/embed');
const { mod, eco, devonly, main } = require('../data/emojis');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Aide du bot'),

    run: async (client, interaction) => {

        const embedHelp = new EmbedBuilder()
            .setAuthor({ name: `Help - MaskFR | Official` })
            .setDescription(`Pour avoir les commandes d'un module spécifique, 
            Appuyez sur le bouton correspondant au module.\n
            ${mod} - Commandes de Modération
            ${eco} - Commandes Economie`)
            .setColor(color)
            .setImage('https://imgur.com/lJtVZYu.png')
            .setTimestamp()
            .setFooter({ text: `MaskFR | Official` })

        const embedMod = new EmbedBuilder()
            .setAuthor({ name: `Modération - MaskFR | Official` })
            .setDescription(`Liste des commandes de modération
        **[] = Obligatoire**
        **() = Optionnel**`)
            .addFields(
                { name: `/ban [user] (reason)`, value: `Ban l'utilisateur`, inline: true },
                { name: `/banid [id] (reason)`, value: `Ban l'utilisateur par son ID`, inline: true },
                { name: `/unban [id] (reason)`, value: `Unban l'utilisateur`, inline: true },
            )
            .setColor(colorMod)
            .setImage('https://imgur.com/RC0VRdp.png')
            .setTimestamp()
            .setFooter({ text: `MaskFR | Official` })

        const embedEco = new EmbedBuilder()
            .setAuthor({ name: `Economie - MaskFR | Official` })
            .setDescription(`Liste des commandes d'économie
        **[] = Obligatoire**
        **() = Optionnel**`)
            .addFields(
                { name: `/bal`, value: `Affiche votre balance`, inline: true },
                { name: `/bal [user]`, value: `Affiche la balance de l'utilisateur`, inline: true },
                { name: `/daily`, value: `Récolte votre récompense quotidienne`, inline: true },
                { name: `/work`, value: `Récolte votre récompense de travail`, inline: true },
                { name: `/pay [user] [amount]`, value: `Payez un utilisateur`, inline: true },
                { name: `/shop`, value: `Affiche le shop`, inline: true },
                { name: `/buy [item]`, value: `Achetez un item`, inline: true },
                { name: `/sell [item]`, value: `Vendez un item`, inline: true },
                { name: `/top`, value: `Affiche le classement des joueurs`, inline: true },
                { name: `/give [user] [amount] ${devonly}`, value: `Donnez de l'argent à un utilisateur`, inline: true },
                { name: `/remove [user] [amount] ${devonly}`, value: `Retirez de l'argent à un utilisateur`, inline: true },
            )
            .setColor(colorEco)
            .setImage('https://imgur.com/KfWq7Bp.png')
            .setTimestamp()
            .setFooter({ text: `MaskFR | Official` })

        const buttonMain = new ButtonBuilder()
            .setCustomId('main')
            .setStyle(ButtonStyle.Secondary)
            .setLabel('Main')
        //.setEmoji(main)
        const buttonMod = new ButtonBuilder()
            .setCustomId('mod')
            .setStyle(ButtonStyle.Secondary)
            .setLabel('Modération')
        //.setEmoji(mod)
        const buttonEco = new ButtonBuilder()
            .setCustomId('eco')
            .setStyle(ButtonStyle.Secondary)
            .setLabel('Economie')
        //.setEmoji(eco)

        const mainActionRow = new ActionRowBuilder()
            .addComponents(buttonMod, buttonEco)
        const modActionRow = new ActionRowBuilder()
            .addComponents(buttonMain, buttonEco)
        const ecoActionRow = new ActionRowBuilder()
            .addComponents(buttonMain, buttonMod)

        interaction.reply({ embeds: [embedHelp], components: [mainActionRow] });


        client.on('interactionCreate', async interaction => {
            if (!interaction.isButton()) return;
            if (interaction.customId === 'mod') {
                interaction.update({ embeds: [embedMod], components: [modActionRow] })
            }
            if (interaction.customId === 'eco') {
                interaction.update({ embeds: [embedEco], components: [ecoActionRow] })
            }
            if (interaction.customId === 'main') {
                interaction.update({ embeds: [embedHelp], components: [mainActionRow] })
            }
        })
    }
}