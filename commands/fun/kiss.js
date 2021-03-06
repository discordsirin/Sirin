const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const db = require('quick.db');
const shipDb = new db.table('shipDb');
module.exports = {
    name: "kiss",
    category: "fun",
    description: "Chụt chụt",
    usage: "<PREFIX>kiss <@tag>",
    run: async (client, message, args) => {
        try {
            const nguoitag = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY}&tag=kiss&rating=R`);
            if (!nguoitag) return message.reply('Tag 1 người nào đi bạn.');
            if (nguoitag.id == message.author.id) return message.channel.send('Bạn không thể tự thơm chính mình.');
            const embed = new MessageEmbed()
                .setDescription(`${message.member} đã thơm ${nguoitag} 💋`)
                .setImage(response.data.data.images.original.url);
            if (shipDb.has(message.author.id)) {
                const authorData = await shipDb.get(message.author.id);
                if (authorData.target.id == nguoitag.id) {
                    authorData.target.kiss++;
                    await shipDb.set(message.author.id, authorData);
                    embed.setFooter(`Nụ hôn ${authorData.target.kiss !== 1 ? `thứ ${authorData.target.kiss}` : 'đầu tiên'} của bạn.`);
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