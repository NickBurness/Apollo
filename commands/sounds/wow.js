const { Command } = require("discord.js-commando");

module.exports = class WowCommand extends Command {
    constructor(client) {
        super(client, {
            name: "wow",
            group: "sounds",
            memberName: "wow",
            description: "play wow sound in voice channel",
            guildOnly: true,
            clientPermissions: ["SPEAK", "CONNECT"],
        })
    }
    run(message) {
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            voiceChannel.join().then(connection => {
                const dispatcher = connection.play("./audiofiles/anime-wow-sound-effect.mp3");
                dispatcher.on("end", () => {
                    this.message.channel.send("Finished Playing.")
                    dispatcher.end();
                    this.message.member.voice.channel.leave();
                })
            })
        }
        else {
            message.reply("Join a voice channel first!");
        }
    }
}