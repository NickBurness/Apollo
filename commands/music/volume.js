const { Command } = require("discord.js-commando");

module.exports = class NowPlayingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "volume",
      aliases: ["v", "cv"],
      group: "music",
      memberName: "volume",
      clientPermissions: ["SEND_MESSAGES"],
      guildOnly: true,
      description: "adjust the volume of the current playing song",
      args:
        [
          {
            key: "wantedVolume",
            prompt: "Set the volume 1-100%",
            type: "integer",
            validate: function (wantedVolume) {
              return wantedVolume > 0 && wantedVolume < 101;
            }
          }
        ]

    });
  }

  run(message, { wantedVolume }) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.reply("Join a channel and try again");

    if (typeof message.guild.musicData.songDispatcher == "undefined" || message.guild.musicData.songDispatcher == null) {
      return message.reply("There is no song playing right now!");
    }
    else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.reply("You must be in the same voice channel as the bot in order to use that!");
      return;
    }
    const volume = wantedVolume / 100;
    message.guild.musicData.volume = volume;
    message.guild.musicData.songDispatcher.setVolume(volume);
    message.say(`Volume set to: ${wantedVolume}%`);
  }
};