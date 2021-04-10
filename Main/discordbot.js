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

client.on("message", msg => {
  if (msg.content === "act") {
    msg.reply(msg.author.presence.activities);
  }
})

client.on("message", msg => {
  if (msg.content === "water") {
    messageAuthor = msg.author;
    msg.channel.send("Time to drink some water! React 👍 after taking a drink!");
  }
})

client.on("message", msg => {
  if (msg.content === "Time to drink some water! React 👍 after taking a drink!") {
    const filter = (reaction, user) => {
      return reaction.emoji.name === '👍';
    };

    const collector = msg.createReactionCollector(filter, { time: 15000 });

    collector.on('collect', (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
      msg.react('👊');
      msg.channel.send(`Good job @${user.tag}! Now you can go back to playing games.`);
    });

    collector.on('end', collected => {
      console.log(`Collected ${collected.size} items`);
      collector.stop();
    });
  }
})

client.on("presenceUpdate", (oldPres, newPres) => {
  oldPres.user.createDM().then(dmCh => {
    dmCh.send("Presence Changed, " + oldPres.activities[0].name +
      ", " + oldPres.activities[0].details + " to " +
      newPres.activities[0].name +
      ", " + newPres.activities[0].details);

  }).catch(error => {
    console.log(error + ", Error in creating DM");
  });
})

client.login('ODMwMzEwMzA5NzY3Njc1OTc0.YHE0vA.3UaDnhS1L72oiJZjyQsvrkC6Dzg');