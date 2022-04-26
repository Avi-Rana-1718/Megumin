const api = require('gogoanime-xp');
const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('manual')
		.setDescription('Get anime from default source')
    .addStringOption(option =>
		option.setName('name')
			.setDescription('Title for the series')
			.setRequired(true))
          .addNumberOption(option =>
      option.setName('id')
      .setDescription('Serial number from /search')
      .setRequired(true))
      .addNumberOption(option =>
      option.setName('episode')
      .setDescription('Episode number')
      .setRequired(true)),
	async execute(interaction) {
    await interaction.deferReply();
  //Search
  api.search(interaction.options.getString('name'))
  .then(res => {
//Title, Ep length, Ep number
    var title = res[interaction.options.getNumber('id')].id;
    var name = res[interaction.options.getNumber('id')].title.replace(/ /g,"-");
    if (name.includes("(Dub)")) {
var name = name.replace("(Dub)","Dub");
    }
    if (name.includes("(TV)")) {
      var name = name.replace("(TV)","TV")
    }
var count = res[interaction.options.getNumber('id')].totalEpisodes;
var ep = interaction.options.getNumber('episode');
    console.log(ep);
      
let info = new MessageEmbed()
    .setTitle(res[interaction.options.getNumber('id')].title)
    .setDescription(res[interaction.options.getNumber('id')].synopsis)
    .setThumbnail(encodeURI(res[interaction.options.getNumber('id')].img))
    .setColor("#E41F7B")
    .addFields(
      	{ name: 'Status', value: `${res[interaction.options.getNumber('id')].status}`, inline: true },
		{ name: 'Episodes', value: `${count}`, inline: true },
  		{ name: 'Genre', value: `${res[interaction.options.getNumber('id')].genres}`, inline: true }
  )
     interaction.editReply({ embeds: [info] });
        //EPLINK
api.animeEpisodeHandler(`${title}-episode-${ep}`)
  .then(data => {
const output = `${title}`;
//SET SRC   
  for(var i = 0; i < data[0].servers.length; i++) {
if (data[0].servers[i].name == "Streamsb") {
 var url = data[0].servers[i].iframe;
 }
     }
       let adv = new MessageEmbed()
  .setTitle(res[interaction.options.getNumber('id')].title)
     .setDescription(`Episode ${ep}\n**Watch**: [Link](https://avi-rana-1718.github.io/Megumin/watch?src=${url}&title=${name}&ep=${ep})`)
      .setColor("#E41F7B")
    .setTimestamp()
  interaction.followUp({ embeds: [adv] });
  }).catch(err => {
       let error = new MessageEmbed()
       .setTitle("**ERROR**")
.setDescription(`Episode not found\n${err}\n__Request__:${interaction.options.getString('name')} episode ${interaction.options.getNumber('episode')}`)
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
