// your index.js should look similar to this:
const { CommandoClient } = require("discord.js-commando");
const { Structures } = require("discord.js");
const path = require("path");
const { prefix, token, discord_owner_id } = require("./config.json");
// It"s vital this is before the initiation of the client
Structures.extend("Guild", Guild => {
    class MusicGuild extends Guild {
        constructor(client, data) {
            super(client, data);
            this.musicData = {
                queue: [],
                isPlaying: false,
                nowPlaying: null,
                skipTimer: false,
                volume: 1,
                songDispatcher: null
            };
        }
    }
    return MusicGuild;
});
const client = new CommandoClient({
    commandPrefix: prefix,
    owner: discord_owner_id,
    unknownCommandResponse: false
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["music", "music commands"],
        ["games", "games commands"],
        ["gifs", "gifs commands" ],
        ["sounds", "sound commands"],
        ["guild","guild commands"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        unknownCommand: false
    })
    .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => {
    console.log("Ready!");
});

client.login(token);
