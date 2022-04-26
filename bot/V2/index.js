
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const express = require('express');
const app = express();

client.once("ready", () => {
  console.log("Ready");
    client.user.setPresence({ activities: [{ name: `slash commands on ${client.guilds.cache.size} servers` }] });
  client.user.setPresence({ activities: [{ name: `slash commands on ${client.guilds.cache.size} servers` }] });
 const name = client.guilds.cache.size;
  const userCount = client.guilds.cache.reduce((a, g) => a+g.memberCount, 0)
app.get('/', (req, res) => {
res.send(`${name}`);
});
 });
app.listen(3000, () => {
  console.log('Server started');
});

client.once("guildCreate", (guild) => {
    client.channels.cache.get('936499399385841724').send(`
<:check:936520510672613386> Joined a new server : ${guild.name}`);
});

const { MessageEmbed } = require('discord.js');

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: '<:disguya:937038585390063667> There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.token);
