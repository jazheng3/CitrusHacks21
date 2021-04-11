require('dotenv').config({path:'./bot_key.env'});

const Discord = require('discord.js');
const client = new Discord.Client();

const reactBotCommand = require('./commands/reactionbot.js');
const waterReminder = require('./commands/water.js');
const waterCelebrate = require('./commands/waterCongrat.js');

const stretchNum = 15;
const stretchLink = "https://ehs.ucsc.edu/programs/ergo/stretch.html"


userList = [];

const bot_key = process.env.BOT_KEY;
//activates discord's bot services
client.login(bot_key);

//Login message to know the bot is operational
client.on("ready", () => {
  console.log('Logged in as ${client.user.tag}!')
})

//Simple test for bot usage
client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
    //console.log(client.user);
  }
})

//Test for activities currently being run
client.on("message", msg => {
  if (msg.content === "act") {
    msg.reply(msg.author.presence.activities);
  }
})

//Tells users whenever a game is closed, i.e. whenever your presence on discord has changed
client.on("presenceUpdate", (oldPres, newPres) => {
  isLobby = false;
  //assign the changing 
  oldActivity = null;
  newActivity = null;
  for (let i = 0; i < newPres.activities.length; i++) {
    if (newPres.activities[i].type == "PLAYING") { // When entering a game, update activities
      newActivity = newPres.activities[i];
      break;
    }
  }
  for (let k = 0; k < oldPres.activities.length; k++) {
    if (oldPres.activities[k].type == "PLAYING") { // When entering a game, update activities
      oldActivity = oldPres.activities[k];
      break;
    }
  }
  console.log(oldActivity + " to " + newActivity);

  if(oldActivity == null) // handle edge case
  {
    return;
  }
  if(oldActivity.type == "PLAYING" && newActivity == null || newActivity.type != "PLAYING") // If just finished a game, stretch  
  {
    console.log("Game Closed");    
    printStretch(oldPres.user);
  }
})

//direct messages the users different stretches from an online database after a period of time
function printStretch(userDM) {
  userDM.createDM().then(dmCh => {
    dmCh.send("That was a intense session! You should perform stretch #" + parseInt(Math.random()*(stretchNum+1), 10) + " from " + stretchLink + " to stay healthy (or more if you would like)! ");
  }).catch(error => {
    console.log(error + ", Error in creating DM");
  });
}

//activates the water reminder service for user
client.on("message", msg => {
  if (msg.content === "!water") {
    waterReminder.executes(msg.channel);
  }
})

//generates the message for water reminder and updates the stats of the user
client.on("message", msg => {
  if (msg.content === "Time to drink some water! React 👍 after taking a drink!") {
    //detects when user reacts specified emoji and looks for their representive object
    //in an array to update their water count
    var userID = waterCelebrate.executes(msg);
    console.log(userID + "user after sneding");
    for(i = 0; i < userList.length;i++) {
      msg.channel.send(userList[i].numWaterBreaks + "number of waters");
      if (userList[i].discordID === userID) {
        userList[i].addWater();
        
      }
    }
    waterCelebrate.executes(msg);
  }
})

//activates the reactionbot, which prompts user to react to a message if they
//want to have the bot track their water usage
client.on("message", msg => {
  if (msg.content === "-reactionbot") {
    reactBotCommand.executes(msg);
    console.log(client.user.lastMessage);
  }
})

//Generates a leaderboard of the amount of water all users have drinked
client.on("message", msg => {
  if(msg.content === "!leaderboard") {
    //console.log("if");
    for (num in leaderboard(msg)) {
      //console.log("for?");
      console.log(num);
      msg.channel.send()
    }
  }
})

//function that gives timely reminders, specifically for a waterbreak here
function sendReminder() {
  return setInterval(waterBreak, 3000);//every 3 seconds as of now
}

function usernameToUser(username) {
  for(user in userSet) {
    if(user.discordID = username.id) {
      return user;
    }
  }
  return null;
}

//leaderboard function that tries to create a simple display for comparing users' water drinking
function leaderboard(msg) {
  console.log("leaderboard");
  waterList = [];
  nameList = [];
  for(i = 0; i < userList.length;i++) {
    waterList.push(userList[i].numWaterBreaks);
    nameList.push(userList[i].getName());
  }
  //waterList.sort();
  msg.channel.send(nameList + "\n" + waterList);
  return waterList;
}
