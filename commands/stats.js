const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { color } = require("../data/embed");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Affiche les statistiques du serveur"),

    run: async (client, interaction) => {

        const embed = new EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024 }) })
            .setDescription(`Statistiques du serveur`)
            .addFields(
                { name: `Membres 🧍`, value: `\`${interaction.guild.memberCount}\``, inline: true },
                { name: `Salons 📁`, value: `\`${interaction.guild.channels.cache.size}\``, inline: true },
                { name: `Rôles 📌`, value: `\`${interaction.guild.roles.cache.size}\``, inline: true },
                { name: `Emojis 🎨`, value: `\`${interaction.guild.emojis.cache.size}\``, inline: true },
                { name: `Boosts 🚀`, value: `\`${interaction.guild.premiumSubscriptionCount}\``, inline: true },
                { name: `Niveau de boost 🚀`, value: `\`${interaction.guild.premiumTier}\``, inline: true },
                { name: `Propriétaire du serveur 👑`, value: `<@${interaction.guild.ownerId}>` },
                { name: `ID du serveur 🆔`, value: `\`${interaction.guild.id}\`` },
                { name: `Date de création 📅`, value: `\`${interaction.guild.createdAt.toLocaleDateString()} - ${interaction.guild.createdAt.toLocaleTimeString()}\`` })
            .setColor(color)
            .setImage({ url: interaction.guild.bannerURL({ format: "png", size: 1024 }) })
            .setThumbnail({ url: interaction.guild.iconURL({ size: 1024 }) })
            .setTimestamp()
            .setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 1024 }) })


        interaction.reply({ embeds: [embed] })
    }
};