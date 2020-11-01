const { Command } = require("discord.js-commando");

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      aliases: ["fs", "next"],
      memberName: "skip",
      group: "music",
      description: "Skip the current song that is playing",
      guildOnly: true
    });
  }

  run(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply("Join a channel and try again");

    let musicDispatcher = message.guild.musicData.songDispatcher;

    if (typeof message.guild.musicData.songDispatcher == "undefined" || musicDispatcher == null ) {
      return message.reply("There is no song playing right now!");
    } 
    else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.reply(`You must be in the same voice channel as the bot in order to use that!`);
      return;
    }
    else
    musicDispatcher.end();
}
};