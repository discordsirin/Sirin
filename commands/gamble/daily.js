const eco = require('../../functions/economy');
const { laysodep } = require('../../functions/utils');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "daily",
    category: 'gamble',
    aliases: ['hangngay'],
    cooldown: 24*3600, //24*3600
    description: "Nhận tiền ",
    usage: 'daily',
    note: 'Quà hằng ngày!',
    run: async (client, message, args) => {
        //let res = await instance.get(`/getdata?id=${message.author.id}`);
        //res = res.data;
        //if (res.data == false) {
        //    const embed = new MessageEmbed()
        //        .setTitle('Nhận tiền thất bại!')
        //       .setDescription(`Bạn chưa upvote cho bot, bạn upvote bằng cách [click vào đây](https://top.gg/bot/645883401500622848/vote)`);
        //    return message.channel.send(embed);
        //} else {
            const random = Math.floor(Math.random() * 50000);
            await eco.addMoney(message.author.id, random);
            message.channel.send(`:moneybag: Bạn vừa được cộng ${random} VNĐ!`);
            await instance.post('/addmoney', {
                id: message.author.id,
            });
        //}
    },
};