const { Client, Message } = require('discord.js-selfbot-v13');
const { Groq } = require("groq-sdk");
const /** @type  {Groq}*/ groq = require("../utils/groq")
async function uwuify(/** @type {Client} */  client, /** @type {Message} */  message ) {
    console.log("uwuify")
    const args = message.content.split(" ").slice(1).join(" ");
    if(message.reference && message.reference.type == "DEFAULT" && message.type == "REPLY" && args.length == 0) {
        const replyId = message.reference.messageId;
        const replyMessage = await message.channel.messages.fetch(replyId);
        if(replyMessage.author.id == client.user.id) {
            message.delete();
            replyMessage.edit(await fetchKawaii(replyMessage.content));
        } else {
            
        }
    } else {
        message.edit(await fetchKawaii(args));
    }
}

module.exports = uwuify;

async function fetchKawaii(msg) {
    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "YOUR ROLE IS TO REFORMAT THE USERS MESSAGE IN YOUR STYLE. DON'T WRITE MORE TEXT THAN THE USER. you're a kawaii girl that sends cute kawaii-like messages. Try to sound cute but also nerdy at the same time."
            },
            {
                role: "user",
                content: msg
            }
        ],
        model: "llama3-8b-8192"
    })
    return completion.choices[0].message;
}