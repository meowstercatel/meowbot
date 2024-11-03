const { Client, Message } = require('discord.js-selfbot-v13');
const { Groq } = require("groq-sdk");
const /** @type  {Groq}*/ groq = require("../utils/groq")
async function ai(/** @type {Client} */  client, /** @type {Message} */  message ) {
    const args = message.content.split(" ").slice(1).join(" ");
    if(message.reference && message.reference.type == "DEFAULT" && message.type == "REPLY" && args.length == 0) {
        const replyId = message.reference.messageId;
        const replyMessage = await message.channel.messages.fetch(replyId);
        if(replyMessage.author.id == client.user.id) {
            message.delete();
            replyMessage.edit(await fetchAiMessage(replyMessage.content));
        } else {
            message.edit(await fetchAiMessage(replyMessage.content));
        }
    } else if(args.length !== 0) {
        message.edit(await fetchAiMessage(args));
    } else {
        message.edit(`command usage: ,ai <message>
        <reply> ,ai`);
        setTimeout(async() =>{
            message.delete();
        }, 3000)
    }
}

module.exports = ai;

async function fetchAiMessage(msg) {
    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: msg
            }
        ],
        model: "llama-3.1-70b-versatile"
    })
    // return completion.choices[0].message;
    return `prompt: ${msg}\n\nanswer: ${completion.choices[0].message.content}`;
}