const db = require('quick.db');
const langList = {
    "en": "en-US",
    "vi": "vi-VN",
};
module.exports = {
    name: "setlanguage",
    category: 'tts',
    aliases: ["setlang"],
    description: "Set default tts lang for tts command",
    usage: "<PREFIX>setlanguage <en or vi>",
    example: "<PREFIX>setlanguage en",
    run: async (client, message, args) => {
        if(!args[0]) {
            const defaulttts = await db.get(`${message.guild.id}.defaulttts`);
            if (!defaulttts || defaulttts === null) return message.channel.send('Giọng text to speech của bạn là \`vi-VN\`');
            message.channel.send(`Ngôn ngữ của bạn là: ${langList[defaulttts]}`);
        }
        else if (!langList[args[0]]) return message.channel.send('Bạn phải nhập `\ en \` hoặc \` vi \` để set ngôn ngữ mặc định.');
        else if (langList[args[0]]) {
            await db.set(`${message.guild.id}.defaulttts`, langList[args[0]]);
            message.channel.send(`Đã set ngôn ngữ mặc định của lệnh tts là: \`${langList[args[0]]}\``);
        }
    },
};