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
            const random = Math.floor(Math.random() * 5000);
            await eco.addMoney(message.author.id, random);
            message.channel.send(`:moneybag: Bạn vừa được cộng ${random} VNĐ!`);
    },
};