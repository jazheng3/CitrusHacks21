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
  for (i = 0; i < newPres.activities.length; i++){
    if (newPres.activities[i].type == "PLAYING"){
      oldActivity = oldPres.activities[i];
      newActivity = newPres.activities[i];
      break;
    }
  }
  if (newActivity == null){
    return;
  }
  console.log(newActivity.state);

  if (newActivity.state == null){
    printStretch(newPres.user);
  }

})

function printStretch(userDM){
  userDM.createDM().then( dmCh => {
    dmCh.send("Time to Stretch");
  }).catch(error => {
    console.log(error + ", Error in creating DM");
  });
}

client.login('ODMwMzEwMzA5NzY3Njc1OTc0.YHE0vA.3UaDnhS1L72oiJZjyQsvrkC6Dzg');