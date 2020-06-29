const { SlackAdapter, Botkit } = require('botbuilder-adapter-slack');
const dotenv = require('dotenv');
dotenv.config();

const adapter = new SlackAdapter({
  clientSigningSecret: process.env.SLACK_SECRET,
  botToken: process.env.SLACK_TOKEN
});

const controller = new Botkit({
  adapter,
  // ...other options
});

controller.on('message', async(bot, message) => {
  await bot.reply(message, 'I heard a message!');
});

