const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const { loadEvents } = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');
const client = new Client({
   intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
   partials: [User, Message, GuildMember, ThreadMember],
});

client.commands = new Collection();
client.config = require('./config.json');
client.login(client.config.token).then(() => {
   loadEvents(client);
   loadCommands(client);
});
client.once('ready', () => {
   console.log("Bot is ready!");
});