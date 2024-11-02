const { Client, Message } = require('discord.js-selfbot-v13');
const delay = ms => new Promise(res => setTimeout(res, ms));

async function spamAddUserToGroup(/** @type {Client} */  client, /** @type {Message} */  message ) {
    console.log("spam add");
    const args = message.content.split(" ").splice(1);
    const delayTimeout = Number(args[1]) ?? 5;
    if(args[0].length == 18 && Number(args[0]) !== NaN) {
        const user = await client.users.fetch(args[0]);
        if(!user) return;
        message.channel.send(`Readding ${user.displayName} for ${delayTimeout}s.`)
        if(message.channel.type == "GROUP_DM") {
            const interval = setInterval(async() => {
                try {
                    await message.channel.addUser(user);
                } catch(e) {}
            }, 500);
            await delay(delayTimeout*1000);
            clearInterval(interval);
        }
    } else {
        message.edit(`correct command usage: ,spamAddUserToGroup <userId> <time in seconds>`);
        setTimeout(async() => {
            await message.delete();
        }, 4000);
    }
}

module.exports = spamAddUserToGroup;