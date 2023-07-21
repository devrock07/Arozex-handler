const { Client, GatewayIntentBits, Partials } = require('discord.js');
require('colors');

const client = new Client({
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false,
  },
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

// Import and execute handlers
['variables', 'extraEvents', 'checker', 'mongo_db', 'server', 'slashCommand', 'events', 'antiCrash'].forEach((handler) => {
  const file = require(`./source/handlers/${handler}`);
  if (file.execute) file.execute(client);
  else file(client);
});

(async () => {
  try {
    await client.login(process.env.TOKEN);
    console.log('Client logged in successfully!'.green.bold);
  } catch (error) {
    console.log(`Login error: ${error.message}`.red.bold);
  }
})();

module.exports = client;
