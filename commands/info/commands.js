const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const db = require('quick.db');
module.exports = {
    name: "commands",
    aliases: ['cmd'],
    category: "info",
    description: "commands",
    usage: "commands",
    run: async (client, message, args) => {
        const server_prefix = await db.get(`${message.guild.id}.prefix`);
        const embed = new MessageEmbed()
            .setColor("#00FFFF")
            .setAuthor(`Help command`, message.guild.iconURL())
            .setThumbnail(client.user.displayAvatarURL());
        if (!args[0]) {
            const categories = readdirSync('./commands/');
            let commandsize = 0;
            categories.forEach(category => {
                const dir = client.commands.filter(c => c.category === category);
                commandsize += parseInt(dir.size);
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
                try {
                    embed.addField(`<a:muiten:735756464257368125> ${capitalise} [${dir.size} lệnh]:`, dir.map(c => `\`${c.name}\``).join(' '));
                } catch(e) {
                    console.log(e);
                }
            });
            embed.setDescription(`Danh sách lệnh cho bot **${message.guild.me.displayName}**\n Prefix của bot là: \`${server_prefix}\`\nTổng lệnh bot có: ${commandsize} lệnh`)
                .setFooter(`Sử dụng ${server_prefix}help {lệnh} để xem chi tiết.`);
            return message.channel.send(embed);
        } else {
            return getCMD(client, message, args[0]);
        }
    },
};
function getCMD(client, message, input) {
    const server_data = db.get(message.guild.id);
    const embed = new MessageEmbed();
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `Không tìm thấy lệnh tên là: **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    if (cmd.name) info = `**Tên lệnh**: \`${server_data.prefix}${cmd.name}\``;
    if (cmd.aliases) info += `\n**Tên rút gọn**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Chi tiết về bot**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Cách sử dụng lệnh**: \`${server_data.prefix}${cmd.usage}\``;
        embed.setFooter(`Cú pháp: <> = bắt buộc, [] = không bắt buộc`);
    }
    if (cmd.note) info += `\n**Note**: ${cmd.note}`;
    if (cmd.example) info += `\n**VD**: \`${server_data.prefix}${cmd.example}\``;

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}