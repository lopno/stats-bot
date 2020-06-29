const { SlackAdapter } = require('botbuilder-adapter-slack');
const botkit = require('botkit');
const dotenv = require('dotenv');
dotenv.config();

const adapter = new SlackAdapter({
  clientSigningSecret: process.env.SLACK_SECRET,
  botToken: process.env.SLACK_TOKEN
});

const controller = new botkit.Botkit({
  adapter,
  // ...other options
});

controller.ready(() => console.log("Bot ready for action!"));

controller.on('message', async(bot, message) => {
  console.log("message:");
  console.log(message.text);
  await bot.reply(message, 'I heard a message!');
});

controller.on("direct_mention", (bot, message) => {
  console.log("direct_mention:");
  console.log(message.text);
  Promise.resolve().then(() => bot.reply(message, "hey man what's up"));
});
