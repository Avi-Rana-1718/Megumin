
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('View list of all available commands'),
  
	async execute(interaction) {
    let help = new MessageEmbed()
    .setTitle("Megumin Help")
      .setDescription("Megumin now uses [slash commands](https://discord.com/blog/slash-commands-are-here), visit [V2 announcement](https://avi-rana-1718.github.io/Megumin/blog/V2) for more info.\n\n:newspaper: **Announcements**\n-New /search & /manual commands\n-Bot rebranded from `Tamako` to `Megumin`\n-V2 now out\n\nList of all commands\n-help\n-anime\n-advance\n-info\n-search\n-manual")
  .setColor("#E41F7B")
      .setTimestamp()
		return interaction.reply({ embeds: [help] });
	},
};
