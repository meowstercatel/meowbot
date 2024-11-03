const { Client, Message } = require('discord.js-selfbot-v13');
const { Database } = require("sqlite");
const delay = ms => new Promise(res => setTimeout(res, ms));
const /** @type {Database}*/ db = require("../../utils/sqlite");

async function deletedSaver(/** @type {Client} */  client, /** @type {Message} */  message) {
    // console.log("deleted msg content: ", message.content);
    db.prepare(`CREATE TABLE IF NOT EXISTS deleted_messages (id char(18), channel_id char(18), guild_id char(18), created_at bigint, content TEXT)`).run().finalize();
    setTimeout(() => {
        db.run(
            'INSERT INTO deleted_messages (id, channel_id, guild_id, created_at, content) VALUES (?, ?, ?, ?, ?)',
            message.id,
            message.channel.id,
            message.guild.id,
            message.createdTimestamp,
            message.content
        )
    }, 100)
}

module.exports = deletedSaver;