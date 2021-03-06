const { MessageEmbed } = require("discord.js");
const axios = require('axios');
const db = require('quick.db');
const shipDb = new db.table('shipDb');
module.exports = {
    name: "pat",
    aliases: ['vodau', 'pet'],
    category: "fun",
    description: "vỗ đầu ai đó",
    usage: "<PREFIX>pat [@tag]",
    run: async (client, message, args) => {
        try {
            const nguoitag = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const response = await axios.get('https://some-random-api.ml/animu/pat');
            const embed = new MessageEmbed()
                .setImage(response.data.link);
                if (nguoitag.length == 0) embed.setDescription(`${message.member.displayName} vỗ về đã tất cả mọi người ♥`);
                else embed.setDescription(`Awwww, ${message.member} đã vỗ về ${nguoitag} ♥`);
                if (shipDb.has(message.author.id)) {
                    const authorData = await shipDb.get(message.author.id);
                    if (authorData.target.id == nguoitag.id) {
                        authorData.target.pat++;
                        await shipDb.set(message.author.id, authorData);
                        embed.setFooter(`Lần vỗ về ${authorData.target.pat !== 1 ? `thứ ${authorData.target.pat}` : 'đầu tiên'} của bạn.`);
                    }
                }
                message.channel.send(embed);
        }
        catch(e) {
            console.log(e);
            return message.channel.send("Bot lỗi khi cố gắng lấy hình, hãy thử lại sau");
        }
    },
};