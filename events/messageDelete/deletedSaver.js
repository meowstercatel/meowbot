const { Client, Message } = require('discord.js-selfbot-v13');
const delay = ms => new Promise(res => setTimeout(res, ms));

async function deletedSaver(/** @type {Client} */  client, /** @type {Message} */  message ) {
    console.log("deleted msg content: ", message.content);
}

module.exports = deletedSaver;