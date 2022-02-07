const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { token } = require('./config.json');

client.once("ready", () => {
  console.log("Ready");
});

const { MessageEmbed } = require('discord.js');

client.once("guildCreate", (guild) => {
  let welcome = new MessageEmbed()
  .setURL("https://tamako.gq")
	.setAuthor({ name: "Tamako", iconURL: "https://media.discordapp.net/attachments/935080227086946365/937727449616244786/20220127_124502.png", url: "https://tamako.gq" })
	.setDescription("Some description here")
    client.channel.send({ embeds: [welcome] })
});

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

client.login(token);
