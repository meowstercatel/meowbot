const { Client } = require('discord.js-selfbot-v13');
const fs = require("fs");
const path = require("path");
const config = require("./config.json")

const client = new Client();

let commands = [];

client.on('ready', async () => {
  console.log(`${client.user?.username} is ready!`);
    client.user?.setAFK(true);
    const COMMANDS_DIRECTORY = path.join(__dirname, 'commands')
    commands = fs
      .readdirSync(COMMANDS_DIRECTORY) // find the plugins
      .filter(x => x.endsWith('.js')) // only use .js files
      .map(pluginName => require(path.join(COMMANDS_DIRECTORY, pluginName)))
})

client.on('messageCreate', async(message) => {
  if(message.author.id !== client.user.id) return;
  if(!message.content.startsWith(",")) return;
  const parsedCommand = message.content.split(" ")[0].slice(1);
  for(const cmd of commands) {
    const name = cmd.name;
    if(name == parsedCommand) {
      cmd(client, message);
    }
  }
})



client.login(config.discord);