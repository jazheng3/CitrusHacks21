const Discord = require('discord.js');
const client = new Discord.Client();
const reactBotCommand = require('./commands/reactionbot.js');
const waterReminder = require('./commands/water.js');
const waterCelebrate = require('./commands/waterCongrat.js');
const stretch_msg1 = "Time to stretch!", stretch_msg2 = "5 pushups!", stretch_msg3 = "Stretch your hands!";
let stretch_msgs = [stretch_msg1, stretch_msg2, stretch_msg3];


userList = [];

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
    if (newPres.activities[i].type == "PLAYING") { // When entering a game, update activities
      oldActivity = oldPres.activities[i];
      newActivity = newPres.activities[i];
      break;
    }
  }
  if(newPres.activities.length == 0)
  {
    return;
  }
  if(oldActivity.type == "PLAYING" && newActivity.type != "PLAYING") // If just finished a game, stretch
  {
    console.log(oldPres.user + " " + newPres.user)
    
    printStretch(oldPres.user);
  }
  console.log(newActivity.state); // null should mean that you are not doing anything
  console.log(oldActivity.type + " " + newActivity.type);
  if (newActivity.state == null) {
    printStretch(newPres.user);
  }
})

function printStretch(userDM) {
  userDM.createDM().then(dmCh => {
    dmCh.send(stretch_msgs[parseInt((Math.random()*stretch_msgs.length), 10)]);
  }).catch(error => {
    console.log(error + ", Error in creating DM");
  });
}

client.on("message", msg => {
  if (msg.content === "!water") {
    waterReminder.executes(msg.channel);
  }
})

client.on("message", msg => {
  if (msg.content === "Time to drink some water! React 👍 after taking a drink!") {
    waterCelebrate.executes(msg);
  }
})

client.on("message", msg => {
  if (msg.content === "-reactionbot") {
    reactBotCommand.executes(msg);
  }
})

client.login('ODMwMzEwMzA5NzY3Njc1OTc0.YHE0vA.CU4NwnlbWzB4Bo2uCBC4wLR1CFQ');


function sendReminder() {
  return setInterval(waterBreak, 3000);
}

function usernameToUser(username) {
  for(user in userSet) {
    if(user.discordID = username.id) {
      return user;
    }
  }
  return null;
}
