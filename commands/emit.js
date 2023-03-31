const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emit')
        .setDescription('Emit an event')
        .addStringOption(option => option.setName('event').setDescription('The event to emit').setRequired(true)),

    run: async (client, interaction) => {
        const event = interaction.options.getString('event');
        const embed = new EmbedBuilder()
        
        try {
            client.emit(event, interaction);
            embed.setDescription(`Event emitted: ${event}`);
            interaction.reply({ embeds: [embed] });
        } catch (err) {
            console.log(err);
            embed.setDescription(`${err}`);
            interaction.reply({ embeds: [embed] });
        }
        
    }
}