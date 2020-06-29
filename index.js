const { SlackAdapter } = require("botbuilder-adapter-slack");
const botkit = require("botkit");
const dotenv = require("dotenv");
dotenv.config();

const adapter = new SlackAdapter({
  clientSigningSecret: process.env.SLACK_SECRET,
  botToken: process.env.SLACK_TOKEN,
  scopes: [
    "app_mentions:read",
    "channels:history",
    "channels:join",
    "channels:read",
    "chat:write",
    "chat:write.customize",
    "commands",
    "emoji:read",
    "groups:history",
    "groups:read",
    "reactions:read",
    "users:read",
    "users:write",
  ],
  oauthVersion: "v2",
  enable_incomplete: true, // TODO: remove after debugging
});

const controller = new botkit.Botkit({
  adapter,
  // ...other options
});

controller.ready(() => console.log("Bot ready for action!"));

const messageHandler = (bot, message) => {
  console.log(`message type ${message.type}: ${message.text}`);
  Promise.resolve().then(() => bot.reply(message, "hey man what's up"));
};

controller.on("message_received", messageHandler);
controller.on("direct_mention", messageHandler);
controller.on("mention", messageHandler);
controller.on("direct_message", messageHandler);
