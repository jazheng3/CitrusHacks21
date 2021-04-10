const Discord = require('discord.js');
//const client = new Discord.Client();

module.exports = {
   reactionRole: function(channel) {
        const botApproveEmoji = '👍';
        const publicApproveEmoji = '👊';
     
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Wellness Bot Consent Settings')
            .setDescription('React to the message to activate bot!\n\n'
                + `${botApproveEmoji} to allow bot to track usage\n`
                + `${publicApproveEmoji} to allow wellness report to publish daily`);
                
        channel.send(embed).then(embed => {
            embed.react(botApproveEmoji);
            embed.react(publicApproveEmoji);
        });

        client.on("messageReactionAdd", (reaction, user) =>{
            if (reaction.emoji.name == botApproveEmoji) {
                console.log("Bot Approved");
            }
        })
    }  
}



   /* name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client) {
        
        const botApproveEmoji = ':thumbsup:';
        const publicApproveEmoji = ':punch:';
 
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Wellness Bot Consent Settings')
            .setDescription('React to the message to activate bot!\n\n'
                + `${botApproveEmoji} to allow bot to track usage\n`
                + `${publicApproveEmoji} to allow wellness report to publish daily`);
            
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(botApproveEmoji);
        messageEmbed.react(publicApproveEmoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            
            if (reaction.emoji.name === botApproveEmoji) {
                //await reaction.message.guild.members.cache.get(user.id).roles.add(yellowTeamRole);
                console.log("Bot Approved");
            }
            if (reaction.emoji.name === publicApproveEmoji) {
                //await reaction.message.guild.members.cache.get(user.id).roles.add(blueTeamRole);
                console.log("Public Approved");
            }
            else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            
                if (reaction.emoji.name === botApproveEmoji) {
                    //await reaction.message.guild.members.cache.get(user.id).roles.remove(yellowTeamRole);
                    console.log("Bot approve remove");
                }
                if (reaction.emoji.name === publicApproveEmoji) {
                    //await reaction.message.guild.members.cache.get(user.id).roles.remove(blueTeamRole);
                    console.log("Bot public remove");
                }
            else {
                return;
            }
        }); 
    } */
 
