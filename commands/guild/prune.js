const { Command } = require("discord.js-commando");

module.exports = class PruneCommand extends Command {
  constructor(client) {
    super(client, {
      name: "prune",
      aliases: ["bulk-delete", "delete"],
      description: "Delete up to 99 recent messages from a Discord Channel",
      group: "guild",
      memberName: "prune",
      guildOnly: true,
      args: [
        {
          key: "deleteCount",
          prompt: "How many messages do you want to delete?",
          type: "integer",
          validate: deleteCount => deleteCount < 100 && deleteCount > 0
        }
      ]
    });
  }

  run(message, { deleteCount }) {
    message.channel
      .bulkDelete(deleteCount)
      .then(messages => message.say(`Deleted ${messages.size} messages`))
      .catch(e => {
        console.error(e);
        return message.say(
          "Something went wrong when trying to delete messages! If you are deleting many messages, try some less first"
        );
      });
  }
};