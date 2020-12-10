const { ownerID } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'developer',
    aliases: ['dev'],
    description: 'Show info của owner của bot ',
    category: 'info',
    usage: '<PREFIX> developer',
    run: async (client, message, args) => {
        const vjetcong = client.users.cache.get(ownerID);
        const embed = new MessageEmbed()
            .setTitle(`Thông tin về Developer`)
            .addField('Thông tin cá nhân', [
                `Tên Discord: ${vjetcong.tag}`,
                "Quốc gia: :flag_vn:",
                `ID user: ${vjetcong.id}`,
                `Online? ${vjetcong.presence.status == 'online' ? 'Có' : 'Không'}`,
            ])
            .setThumbnail(vjetcong.displayAvatarURL());
        message.channel.send(embed);
    },
};