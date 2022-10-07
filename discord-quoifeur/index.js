const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const config = require("./config.json");

const gifs = [
    "feur-0.gif",
    "feur-1.gif",
    "feur-2.gif",
    "feur-3.gif",
    "feur-4.gif",
]


const client = new Client({
    partials: [
        'CHANNEL', // Required to receive DMs
    ],
    intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
  ]
});


client.on("messageCreate", function(message) { 
    if (message.author.bot) return;
    if (!IsEndingByLower(message.content, "quoi"))
        return;

    // Get File
    const rd = getRandomInt(9999999999999999);
    const gif = gifs[rd%gifs.length];

    // Construct gif
    const file = new AttachmentBuilder(`./assets/${gif}`);
    const ballembed = new EmbedBuilder()
    .setImage(`attachment://${gif}`);

    // Reply to QUOI
    message.reply({embeds: [ballembed], files: [file]});
    
});

/** Utils Methods */

function IsEndingByLower(str, word) {
    const reg = "\\b(\\w+)\\W*$";
    const matches = str.matchAll(reg);
    for (const match of matches) {
        if (match.length < 2)
            return;
        if (match[1].toLowerCase() == word)
            return true;
    }
    return false;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

client.login(config.BOT_TOKEN);
console.log("Running");
