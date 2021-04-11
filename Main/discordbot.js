const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('./commands.js');

var myChannel;

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
/*
client.on("presenceUpdate", (oldPres, newPres) => {
  oldPres.user.createDM().then( dmCh => {
    dmCh.send("Presence Changed, " + oldPres.activities[0].name + 
      ", "+ oldPres.activities[0].type + " to " + 
      newPres.activities[0].name + 
      ", "+ newPres.activities[0].type);
  }).catch(error => {
    console.log(error + ", Error in creating DM");
  });
})
*/

client.on("presenceUpdate", (oldPres, newPres) => {
  isLobby = false;
  //assign the changing 
  oldActivity = null;
  newActivity = null;
  for (i = 0; i < newPres.activities.length; i++) {
    if (newPres.activities[i].type == "PLAYING") {
      oldActivity = oldPres.activities[i];
      newActivity = newPres.activities[i];
      break;
    }
  }
  if (oldActivity == null || newActivity == null) {
    return;
  }
  console.log(newActivity.state);

  if (newActivity.state == null) {
    printStretch(newPres.user);
  }

})

function printStretch(userDM) {
  userDM.createDM().then(dmCh => {
    dmCh.send("Time to Stretch");
  }).catch(error => {
    console.log(error + ", Error in creating DM");
  });
}

client.on("message", msg => {
  if (msg.content === "!water") {
    myChannel = msg.channel;
    makeHourlyReminders();
  }
})

function waterBreak() {
  myChannel.send("Time to drink some water! React 👍 after taking a drink!");
}

client.on("message", msg => {
  if (msg.content === "-reactionrole") {
    commands.reactionRole(msg.channel);
  }
})

client.on("message", msg => {
  if (msg.content === "Time to drink some water! React 👍 after taking a drink!") {
    congralutoryWater(msg);
  }
})

function congralutoryWater(msg) {
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

client.on("message", msg => {
  if (msg === "-reactionbot") {
    commands.reactionRole(msg.channel);
  }
})

client.login('ODMwMzEwMzA5NzY3Njc1OTc0.YHE0vA.3UaDnhS1L72oiJZjyQsvrkC6Dzg');

function makeHourlyReminders() {
  var nextDate = new Date();
  if (nextDate.getMinutes() === 0) { // You can check for seconds here too
    return sendReminder();
  } else {
    nextDate.setHours(nextDate.getHours() + 1);
    nextDate.setMinutes(0);
    nextDate.setSeconds(0);// I wouldn't do milliseconds too ;)

    var difference = nextDate - new Date();
    return setTimeout(sendReminder, 10000);
  }
}

function sendReminder() {
  return setInterval(waterBreak, 5000);
}