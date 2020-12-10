const db = require('quick.db');
module.exports = {
    name: 'disconnect',
    aliases: ['leave', 'dis'],
    category: 'tts',
    description: 'Để disconnect cho bot',
    usage: '<PREFIX>disconnect',
    run: async (client, message, args) => {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('Bạn phải vào voice mới có thể sử dụng lệnh này!');
        if (!voiceChannel.members.get(client.user.id)) return message.channel.send('Bot không ở chung phòng với bạn!');
        await db.set(`${message.guild.id}.botdangnoi`, false);
        await db.delete(`${message.guild.id}.endTime`);
        await voiceChannel.leave();
        message.react('👌');
    },
};