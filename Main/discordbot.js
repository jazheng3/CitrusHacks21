const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready", () => {
  console.log('Logged in as ${client.user.tag}!')
})

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
})

client.login('ODMwMzEwMzA5NzY3Njc1OTc0.YHE0vA.3UaDnhS1L72oiJZjyQsvrkC6Dzg');