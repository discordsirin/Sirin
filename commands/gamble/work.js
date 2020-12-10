const eco = require('../../functions/economy');
const { laysodep } = require('../../functions/utils');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "work",
    category: 'gamble',
    aliases: ['w', 'lamviec'],
    cooldown: 300, 
    description: "Làm việc ",
    usage: 'work',
    note: 'làm việc để nhận tiền!',
    run: async (client, message, args) => {
          //const random = Math.floor(Math.random() * 2000);
            await eco.addMoney(message.author.id, 200);
			const embed = new MessageEmbed()
			      .setAuthor('Làm việc')
				  .setDescription(`:moneybag: Bạn vừa được cộng 200 VNĐ!`)
				  .setFooter('Có làm mới có ăn')
            message.channel.send(embed);
            //await instance.post('/addmoney', {
            //    id: message.author.id,
            //});
        
    },
};