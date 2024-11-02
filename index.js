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
      .readdirSync(COMMANDS_DIRECTORY)
      .filter(x => x.endsWith('.js'))
      .map(pluginName => require(path.join(COMMANDS_DIRECTORY, pluginName)))


      const EVENTS_DIRECTORY = path.join(__dirname, 'events');
      fs.readdir(EVENTS_DIRECTORY, {withFileTypes: true}, (err, files) => {
        for(const folder of files) {
          if(!folder.isDirectory()) continue;
          const folderDir = path.join(EVENTS_DIRECTORY, folder.name);
          fs.readdir(folderDir, {withFileTypes: true}, (err, files) => {
            for(const file of files) {
              // console.log(path.join(folderDir, file.name))
              const eventFunction = require(`${folderDir}/${file.name}`);//require(path.join(folderDir, file.name));
              // console.log(eventFunction);
              client.on(folder.name, async(...args) => {
                eventFunction(client, ...args);
              })
            }
          })
        }
      })

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