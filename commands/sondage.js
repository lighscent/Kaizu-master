const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { data } = require('../data/data');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sondage')
        .setDescription('MOD - Créer un sondage')
        .addSubcommand(subcommand => subcommand.setName('oui-non').setDescription('Créer un sondage oui/non')
            .addStringOption(option => option.setName('question').setDescription('La question du sondage').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('choix')
                .setDescription('Créer un sondage avec des choix')
                .addStringOption(option => option.setName('question').setDescription('La question du sondage').setRequired(true))
                .addStringOption(option => option.setName('choix1').setDescription('Le premier choix').setRequired(true))
                .addStringOption(option => option.setName('choix2').setDescription('Le deuxième choix').setRequired(true))
                .addStringOption(option => option.setName('choix3').setDescription('Le troisième choix').setRequired(false))
                .addStringOption(option => option.setName('choix4').setDescription('Le quatrième choix').setRequired(false))
                .addStringOption(option => option.setName('choix5').setDescription('Le cinquième choix').setRequired(false)))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageEvents),

    run: async (client, interaction) => {
        const subcommand = interaction.options.getSubcommand();
        const question = interaction.options.getString('question');
        const choix1 = interaction.options.getString('choix1');
        const choix2 = interaction.options.getString('choix2');
        const choix3 = interaction.options.getString('choix3') || null;
        const choix4 = interaction.options.getString('choix4') || null;
        const choix5 = interaction.options.getString('choix5') || null;
        const user = interaction.options.getUser('user') || interaction.user;

        const yes = data.emojis.yes;
        const no = data.emojis.no;
        const one = data.emojis.one;
        const two = data.emojis.two;
        const three = data.emojis.three;
        const four = data.emojis.four;
        const five = data.emojis.five;


        const embed = new EmbedBuilder()
            .setDescription(`**Sondage** - Proposé par ${user}\n\n**Question:** ${question}`)
            .setColor(data.colors.base)


        if (subcommand === 'oui-non') {
            embed.addFields(
                { name: `Pour/Oui`, value: `${yes}`, inline: true },
                { name: `Contre/Non`, value: `${no}`, inline: true }
            );
            const messag = await interaction.reply({ embeds: [embed], fetchReply: true });
            Promise.all([
                messag.react(`${yes}`),
                messag.react(`${no}`)
            ])


        } else if (subcommand === 'choix') {
            // if choix3 is null, then choix4 and choix5 are null too
            if (choix3 === null) {
                embed.addFields(
                    { name: `Choix 1`, value: `${one} ${choix1}`, inline: true },
                    { name: `Choix 2`, value: `${two} ${choix2}`, inline: true }
                );
                const messag = await interaction.reply({ embeds: [embed], fetchReply: true });
                Promise.all([
                    messag.react(`${one}`),
                    messag.react(`${two}`)
                ])
            }
            // if choix4 is null, then choix5 is null too
            else if (choix4 === null) {
                embed.addFields(
                    { name: `Choix 1`, value: `${one} ${choix1}`, inline: true },
                    { name: `Choix 2`, value: `${two} ${choix2}`, inline: true },
                    { name: `Choix 3`, value: `${three} ${choix3}`, inline: true }
                );
                const messag = await interaction.reply({ embeds: [embed], fetchReply: true });
                Promise.all([
                    messag.react(`${one}`),
                    messag.react(`${two}`),
                    messag.react(`${three}`)
                ])
            }
            // if choix5 is null
            else if (choix5 === null) {
                embed.addFields(
                    { name: `Choix 1`, value: `${one} ${choix1}`, inline: true },
                    { name: `Choix 2`, value: `${two} ${choix2}`, inline: true },
                    { name: `Choix 3`, value: `${three} ${choix3}`, inline: true },
                    { name: `Choix 4`, value: `${four} ${choix4}`, inline: true }
                );
                const messag = await interaction.reply({ embeds: [embed], fetchReply: true });
                Promise.all([
                    messag.react(`${one}`),
                    messag.react(`${two}`),
                    messag.react(`${three}`),
                    messag.react(`${four}`)
                ])
            }
            // if choix5 is not null
            else {
                embed.addFields(
                    { name: `Choix 1`, value: `${one} ${choix1}`, inline: true },
                    { name: `Choix 2`, value: `${two} ${choix2}`, inline: true },
                    { name: `Choix 3`, value: `${three} ${choix3}`, inline: true },
                    { name: `Choix 4`, value: `${four} ${choix4}`, inline: true },
                    { name: `Choix 5`, value: `${five} ${choix5}`, inline: true }
                );
                const messag = await interaction.reply({ embeds: [embed], fetchReply: true });
                Promise.all([
                    messag.react(`${one}`),
                    messag.react(`${two}`),
                    messag.react(`${three}`),
                    messag.react(`${four}`),
                    messag.react(`${five}`)
                ])
            }
        }
    }
}