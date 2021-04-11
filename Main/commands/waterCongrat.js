module.exports = {
    name: 'waterCongrat',
    description: 'Congragulates user on drinking water',
    executes (message) {
        
            const filter = (reaction, user) => {
              return reaction.emoji.name === '👍';
            };
          
            const collector = message.createReactionCollector(filter, { time: 15000 });
          
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
}