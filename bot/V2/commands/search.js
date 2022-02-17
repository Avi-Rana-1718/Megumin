const api = require('gogoanime-xp');
const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription('Get better results for /anime')
       .addStringOption(option =>
  option.setName('name')
			.setDescription('Title for the series')
			.setRequired(true)),
	async execute(interaction) {
await interaction.deferReply();
      await wait(5000);
  //Search
  api.search(interaction.options.getString('name'))
  .then(res => {
      let search = new MessageEmbed()
      .setTitle(`Search results for ${interaction.options.getString('name')}`)
      for(var i = 0; i < res.length; i++) {
 
  search.addField(`${i}`, `${res[i].id}`);
      }
      
    interaction.editReply({ embeds: [search] });
  }).catch(err => {
       let error = new MessageEmbed()
       .setTitle("**ERROR**")
.setDescription(`${err}`)
      .setColor("#D0342C")
    .setTimestamp()
  interaction.editReply({ embeds: [error], ephemeral: true });
   });
	},
};
