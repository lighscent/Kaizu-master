const { data } = require('../data/data');
const db = require('../db');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;
        if (message.guild.id !== data.server.maskfr) return;
        if (message.channel.type === 'DM') return;




        // add the user id in the table "ecoUser" if it doesn't exist
        db.get(`SELECT * FROM ecoUser WHERE idUser = '${message.author.id}'`, async (err, row) => {
            if (err) throw err;
            if (!row) {
                db.run(`INSERT INTO ecoUser (idUser, moneyUser, cooldownDaily) VALUES ('${message.author.id}', 0, 0)`);
            }
        });


        // add the user id in the table "lvlUser" if it doesn't exist
        db.get(`SELECT * FROM lvlUser WHERE idUser = '${message.author.id}'`, async (err, row) => {
            if (err) throw err;
            if (!row) {
                db.run(`INSERT INTO lvlUser (idUser, xpUser, xpUserTotal, lvlUser) VALUES ('${message.author.id}', 0, 0, 0)`);
            }
        });

        const salut = data.words.salut;
        // add reaction to the message
        if (salut.includes(message.content.toLowerCase())) {
            message.react('👋');
        }

        const prefix = data.prefix;

        if (message.content.length <= 3) return;
        if (prefix.includes(message.content.split("")[0])) return;

        // add 1 the moneyUser of the user
        db.get(`SELECT * FROM ecoUser WHERE idUser = '${message.author.id}'`, async (err, row) => {
            if (err) throw err;
            if (row) {
                db.run(`UPDATE ecoUser SET moneyUser = ${row.moneyUser + 1} WHERE idUser = '${message.author.id}'`);
            }
        });

        // add 1 the moneyServer of the server
        db.get(`SELECT * FROM ecoServer WHERE idServer = '${message.guild.id}'`, async (err, row) => {
            if (err) throw err;
            if (row) {
                db.run(`UPDATE ecoServer SET moneyServer = ${row.moneyServer + 1} WHERE idServer = '${message.guild.id}'`);
            }
        });

        // add 1 to the xpUser and xpUserTotal of the user
        db.get(`SELECT * FROM lvlUser WHERE idUser = '${message.author.id}'`, async (err, row) => {
            if (err) throw err;
            if (row) {
                db.run(`UPDATE lvlUser SET xpUser = ${row.xpUser + 2}, xpUserTotal = ${row.xpUserTotal + 2} WHERE idUser = '${message.author.id}'`);
            }
        });


        // check if xpUser is equal to 100
        // if yes, add 1 to lvlUser and set xpUser to 0
        db.get(`SELECT * FROM lvlUser WHERE idUser = '${message.author.id}'`, async (err, row) => {
            if (err) throw err;
            if (row) {
                if (row.xpUser >= 100) {
                    db.run(`UPDATE lvlUser SET xpUser = 0, lvlUser = ${row.lvlUser + 1} WHERE idUser = '${message.author.id}'`);
                }
            }
        });
    }
}