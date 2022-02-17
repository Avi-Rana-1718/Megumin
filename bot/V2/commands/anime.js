const api = require('gogoanime-xp');
const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('anime')
		.setDescription('Get anime from default source')
    .addStringOption(option =>
		option.setName('name')
			.setDescription('Title for the series')
			.setRequired(true))
      .addNumberOption(option =>
      option.setName('episode')
      .setDescription('Episode number')
      .setRequired(true)),
	async execute(interaction) {
    await interaction.deferReply();
      await wait(5000);
  //Search
  api.search(interaction.options.getString('name'))
  .then(res => {
//Title, Ep length, Ep number
    var title = res[0].id;
var count = res[0].totalEpisodes;
var ep = interaction.options.getNumber('episode');
    console.log(ep);
      
let info = new MessageEmbed()
    .setTitle(res[0].title)
    .setDescription(res[0].synopsis)
    .setThumbnail(res[0].img)
    .setColor("#E41F7B")
    .addFields(
      	{ name: 'Status', value: `${res[0].status}`, inline: true },
		{ name: 'Episodes', value: `${count}`, inline: true },
  		{ name: 'Genre', value: `${res[0].genres}`, inline: true }
  )
     interaction.editReply({ embeds: [info] });
        //EPLINK
 api.animeEpisodeHandler(`${title}-episode-${ep}`)
  .then(data => {
const output = `${title}`;
    console.log(output);
//SET SRC   
if (data[0].servers[0].name == "Streamsb") {
var url = data[0].servers[0].iframe;
    } else if (data[0].servers[1].name == "Streamsb") {
var url = data[0].servers[1].iframe;
    } else if (data[0].servers[2].name == "Streamsb") {
var url = data[0].servers[2].iframe;
    } else if (data[0].servers[3].name == "Streamsb") {
  var url = data[0].servers[3].iframe;
    } else if (data[4].servers[4].name == "Xstreamcdn") {
var url = data[0].servers[4].iframe;
    } else if (data[0].servers[5].name == "Xstreamcdn") {
var url = data[0].servers[5].iframe;
    }
let src = new MessageEmbed()
    .setTitle(`**${res[0].title}**`)
    .setDescription(`Episode ${ep}\n**Watch**: [Link](https://avi-rana-1718.github.io/Megumin/watch?src=${url}&title=${title}&ep=${ep})`)
      .setColor("#E41F7B")
    .setTimestamp()
  interaction.followUp({ embeds: [src] });
  }).catch(err => {
       let error = new MessageEmbed()
       .setTitle("**ERROR**")
.setDescription(`Episode not found\n${err}\n__Request__:${interaction.options.getString('name')}-${interaction.options.getNumber('episode')}`)
      .setColor("#D0342C")
    .setTimestamp()
  interaction.editReply({ embeds: [error], ephemeral: true });
   });

  }).catch(err => {
       let error = new MessageEmbed()
       .setTitle("**ERROR**")
.setDescription(`Invalid search\n${err}\n__Request__:${interaction.options.getString('name')}`)
      .setColor("#D0342C")
    .setTimestamp()
  interaction.editReply({ embeds: [error], ephemeral: true });
   });
	},
};
