module.exports = {
    name: 'waterCongrat',
    description: 'Congratulates user on drinking water',
    executes (message) {
        
            const filter = (reaction, user) => {
              return reaction.emoji.name === '👍' && user.id === user.id;
            };
          
            const collector = message.createReactionCollector(filter, { time: 15000 });
            let userId;
            collector.on('collect', (reaction, user) => {
              console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
              message.react('👊');
              message.channel.send(`Good job @${user.tag}! Now you can go back to playing games.`);
              userId = user.id;
            });
          
            collector.on('end', collected => {
              console.log(`Collected ${collected.size} items`);
              collector.stop();
            });
            return userId;
    }
}