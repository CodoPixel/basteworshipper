const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
require("dotenv").config();

const { loadEvents } = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');
const client = new Client({
   intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
   partials: [User, Message, GuildMember, ThreadMember],
});

client.commands = new Collection();
client.login(process.env.TOKEN).then(() => {
   loadEvents(client);
   loadCommands(client);
});