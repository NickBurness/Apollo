const { Command } = require("discord.js-commando");

module.exports = class RpsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "rps",
            group: "games",
            memberName: "rps",
            description: "play a game of rock paper scissors with Apollo",
            args: [
                {
                    key: "text",
                    prompt: "Choose from either Rock, Paper or Scissors",
                    type: "string",
                },
            ],
        });
    }

    run(message, { text }) {
        const acceptedReplies = ["rock", "paper", "scissors"];
        const randomize = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[randomize];
        const choice = text;

        if (!choice) return message.channel.send(`How to play: \`!rps <rock|paper|scissors>\``);

        if (!acceptedReplies.includes(choice)) return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(", ")}\``);

        message.channel.send(`Bot\'s choice: ${result}`);

        if (result === choice) return message.say("It's a tie! We had the same choice.");

        switch (choice) {
            case "rock": {
                (result === "paper") ? message.say("I Won!") : message.say("You Won!"); 
            }
            case "paper": {
                (result === "scissors") ? message.say("I Won!") : message.say("You Won!");
                }
            case "scissors": {
                (result === "rock") ? message.say("I Won!") :  message.say("You Won!");
                }
            default: return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(", ")}\``);
        }
    };
}