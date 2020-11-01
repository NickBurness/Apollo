const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class QueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: "queue",
            group: "music",
            memberName: "queue",
            guildOnly: true,
            description: "Displays the current song queue"
        });
    }

    run(message) { 
        let musicQueue = message.guild.musicData.queue;
        let queueLength = musicQueue.length;

        if (queueLength == 0) return message.say("There are no songs in queue!");

        const titleArray = [];

        musicQueue.slice(0, 10).forEach(song => {
            titleArray.push(song.title);
        });

        let queueEmbed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle(`Music Queue - ${queueLength} items`);
        for (let i = 0; i < titleArray.length; i++) {
            queueEmbed.addField(`${i + 1}:`, `${titleArray[i]}`);
        }
        return message.say(queueEmbed);
    }
};