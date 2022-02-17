const api = require('gogoanime-xp');
const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('advance')
		.setDescription('Get anime from multiple sources')
    .addStringOption(option =>
		option.setName('name')
			.setDescription('Title for the series')
			.setRequired(true))
      .addNumberOption(option =>
      option.setName('episode')
      .setDescription('Episode number')
      .setRequired(true)),
	async execute(interaction) {
    let reply = new MessageEmbed()
await interaction.deferReply();
  //Search
  api.search(interaction.options.getString('name'))
  .then(res => {
//Title, Ep length, Ep number
    var title = res[0].id;
var count = res[0].totalEpisodes;
var ep = interaction.options.getNumber('episode');
    console.log(ep);
        //EPLINK
 api.animeEpisodeHandler(`${title}-episode-${ep}`)
  .then(data => {
const output = `${title}`;
//SET SRC   
  let adv = new MessageEmbed()
  .setTitle(res[0].title)
      .addFields(
        {name:`${data[0].servers[0].name}`, value:`http://${data[0].servers[0].iframe}`},
        {name:`${data[0].servers[1].name}`, value:`${data[0].servers[1].iframe}`},
        {name:`${data[0].servers[2].name}`, value:`${data[0].servers[2].iframe}`},
        {name:`${data[0].servers[3].name}`, value:`${data[0].servers[3].iframe}`},
        {name:`${data[0].servers[4].name}`, value:`${data[0].servers[4].iframe}`},
)
      .setColor("#E41F7B")
    .setTimestamp()
  interaction.editReply({ embeds: [adv] });
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
