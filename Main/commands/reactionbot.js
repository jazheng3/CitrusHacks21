const Discord = require('discord.js');
const storage = require('./user.js');

module.exports = {
    
    name: 'reactionbot',
    description: 'Manages bot usage',
    executes (message) {
        let messageId;
        let collector;
        const botApproveEmoji = '👍';
        const publicApproveEmoji = '👊';
        
        message.react(botApproveEmoji);
        
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Wellness Bot Consent Settings')
            .setDescription('React to the message above to activate bot!\n\n'
                + `${botApproveEmoji} to allow bot to track usage\n`);
                
        message.channel.send(embed);
        
        const filter = (reaction, user) => {
            return reaction.emoji.name === '👍' && user.id === user.id;
        };
        collector = message.createReactionCollector(filter, { time: 100000 });
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
 
