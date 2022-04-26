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
  //Search
  api.search(interaction.options.getString('name'))
  .then(res => {

       const list = [];
    for(var i = 0; i < res.length; i++) {

  list.push(`${i}. ${res[i].title}\n`);
      }
    
      let search = new MessageEmbed()
      .setTitle(`Search results for ${interaction.options.getString('name')}`)
        .setDescription(`${list.toString().replace(/,/g,"")}`)
          .setColor("#E41F7B")
        .setFooter("Use /manual to get anime from this list")
          .setTimestamp()
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
