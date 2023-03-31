const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
const db = require("../db");
const crypto = require('crypto');
const { data } = require("../data/data");


module.exports = {
    name: 'guildMemberAdd',

    async execute(member, client) {
        function generateRandomLetters(length) {
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let result = '';

            for (let i = 0; i < length; i++) {
                const randomIndex = crypto.randomInt(alphabet.length);
                const randomLetter = alphabet.charAt(randomIndex);
                result += randomLetter;
            }
            return result;
        }
        const verificationCode = generateRandomLetters(5);


        const verificationEmbed = new EmbedBuilder()
            .setTitle('Vérification du compte')
            .setDescription(`Pour accéder au reste du serveur, merci de vérifier ton compte en envoyant le message suivant:\n\n\`\`\`${verificationCode}\`\`\``)
            .setColor(data.colors.base)
            .setTimestamp()
            .setFooter({ text: `Si le code ne fonctionne pas, mentionne un staff` })

        const verificationChannel = member.guild.channels.cache.find(c => c.id === data.channels.verificationId);
        verificationChannel.send({ content: `<@${member.id}>`, embeds: [verificationEmbed] });



        const filter = m => m.author.id === member.id && m.content.toUpperCase() === verificationCode.toUpperCase();
        verificationChannel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
            .then(async collected => {
                const memberRole = member.guild.roles.cache.find(r => r.id === data.roles.memberId);
                member.roles.add(memberRole);
                const messages = await verificationChannel.messages.fetch();
                const botMessage = messages.find(m => m.content.includes(member.id));
                botMessage.delete();
                const memberMessage = messages.find(m => m.content.includes(verificationCode));
                memberMessage.delete();
            })
            .catch(async () => {
                member.kick();
            });




        const joinChannel = member.guild.channels.cache.find(c => c.id === data.channels.joinId);
        const joinLogsChannel = member.guild.channels.cache.find(c => c.id === data.channels.joinLogsId);

        const joinEmbed = new EmbedBuilder()
            .setTitle('🛬 Un nouvel utilisateur est arrivé !')
            .setDescription(`Bienvenue à toi ${member} parmis nous !\nNous sommes désormais **${member.guild.memberCount} Membres**!`)
            .setColor(data.colors.base)
            .setTimestamp()
            .setFooter({ text: `ID: ${member.id}` })
            .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() });

        const joinStaffEmbed = new EmbedBuilder()
            .setTitle(`🛬 ${member.user.tag} a rejoint le serveur !`)
            .setDescription(`Compte créé il y a **${moment(member.user.createdAt).fromNow()}**`)
            .addFields(
                { name: 'Tag', value: `${member.user.tag}`, inline: true },
                { name: 'ID', value: `${member.id}`, inline: true },
                { name: 'Compte créé le', value: `${member.user.createdAt.toLocaleString()}`, inline: true },
                { name: 'Compte rejoint le', value: `${member.joinedAt.toLocaleString()} `, inline: true },
                { name: 'Roles', value: `${member.roles.cache.map(r => r).join(' ')}`, inline: true },
            )
            .setColor(data.colors.base)
            .setTimestamp()
            .setFooter({ text: `ID: ${member.id}` })


        joinChannel.send({ embeds: [joinEmbed] });
        joinLogsChannel.send({ embeds: [joinStaffEmbed] });
    }
}