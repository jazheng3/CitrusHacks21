const Discord = require('discord.js');
const storage = require('./user.js');

module.exports = {
    name: 'reactionbot',
    description: 'Manages bot usage',
    executes (message) {
        const botApproveEmoji = '👍';
        const publicApproveEmoji = '👊';
     
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Wellness Bot Consent Settings')
            .setDescription('React to the message to activate bot!\n\n'
                + `${botApproveEmoji} to allow bot to track usage\n`
                + `${publicApproveEmoji} to allow wellness report to publish daily`);
                
        message.channel.send(embed).then(embed => {
            embed.react(botApproveEmoji);
            embed.react(publicApproveEmoji);
        });
        
        const filter = (reaction, user) => {
            return reaction.emoji.name === '👍' && user.id === user.id;
          }; 
        
          const collector = message.createReactionCollector(filter, { time: 100000 });
        
          collector.on('collect', (reaction, user) => {
              let newUser = new storage.User(user.tag, user.id);
              userList.push(newUser);
              console.log(newUser);
              console.log(userList);
          });
        
          collector.on('end', collected => {
              console.log(`Collected ${collected.size} items`);
          }); 
    }  
}
 
