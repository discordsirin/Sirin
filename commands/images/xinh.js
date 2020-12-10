const { MessageEmbed, MessageAttachment } = require('discord.js');
const { readdirSync, readFileSync } = require('fs');
module.exports = {
    name: 'xinh',
    category: 'images',
    description: 'Show ảnh gái(nguồn từ gaixinhchonloc.com)',
    aliases: ['girl'],
    usage: '<PREFIX>girl',
    cooldown: 3,
    run: async (client, message, args) => {
        const folder = readdirSync("././assets/gaixinhchonloc");
        const randomFile = folder[Math.floor(Math.random() * folder.length)];
        const file = readFileSync(`././assets/gaixinhchonloc/${randomFile}`);
        const ext = randomFile.slice(-3);
        const attachment = new MessageAttachment(file, `gaixinh.${ext}`);
        const embed = new MessageEmbed()
            .attachFiles(attachment)
            .setImage(`attachment://gaixinh.${ext}`)
            .setFooter('Nguồn: gaixinhchonloc.com');
        message.channel.send(embed);
    },
};