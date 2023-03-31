const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/db.sqlite');

db.serialize(() => {
    // crée une table nommé "ecoUser" si elle n'existe pas avec les colonnes "idUser", "tagUser", "moneyUser", "cooldownDaily"
    db.run('CREATE TABLE IF NOT EXISTS ecoUser (idUser TEXT, moneyUser INTEGER, cooldownDaily INTEGER)');

    // crée une table nommé "ecoServer" si elle n'existe pas avec les colonnes "idServer", "moneyServer"
    db.run('CREATE TABLE IF NOT EXISTS ecoServer (idServer TEXT, moneyServer INTEGER)');

    // crée une table nommé "lvlUser" si elle n'existe pas avec les colonnes "idUser", "xpUser", "xpUserTotal", "lvlUser"
    db.run('CREATE TABLE IF NOT EXISTS lvlUser (idUser TEXT, xpUser INTEGER, xpUserTotal INTEGER, lvlUser INTEGER)');

    // crée une table nommé "accountUser" si elle n'existe pas avec les colonnes "pseudoUser", "passwordUser", "idAccountUser"
    db.run('CREATE TABLE IF NOT EXISTS accountUser (idAccountUser TEXT, pseudoUser TEXT, passwordUser TEXT)');

});

// when the bot is stopped, close the database connection
db.on('close', () => {
    db.close();
});



module.exports = db;