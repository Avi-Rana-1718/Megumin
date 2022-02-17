const api = require('gogoanime-xp');
const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get information about an anime')
        .addStringOption(option =>
  option.setName('name')
			.setDescription('Title for the series')
			.setRequired(true)),
	async execute(interaction) {
 await interaction.deferReply();
  //Search
  api.search(interaction.options.getString('name'))
  .then(res => {
//Title, Ep length, Ep number
    var title = res[0].id;
var count = res[0].totalEpisodes;
var ep = interaction.options.getNumber('episode');
      
let info = new MessageEmbed()
    .setTitle(res[0].title)
    .setDescription(res[0].synopsis)
    .setThumbnail(res[0].img)
    .setColor("#E41F7B")
    .addFields(
		{ name: 'Genre', value: `${res[0].genres}`, inline: true },
		{ name: 'Episodes', value: `${count}`, inline: true },
	{ name: 'Status', value: `${res[0].status}`, inline: true }
  )
     interaction.editReply({ embeds: [info] });
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
