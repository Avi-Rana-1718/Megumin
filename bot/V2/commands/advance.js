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
  var title = res[0].id;
    var name = res[0].title.replace(/ /g,"-");
    if (name.includes("(Dub)")) {
var name = name.replace("(Dub)","Dub");
    }
        if (name.includes("(TV)")) {
      var name = name.replace("(TV)","TV")
    }
var count = res[0].totalEpisodes;
var ep = interaction.options.getNumber('episode');
    console.log(ep);
        //EPLINK
 api.animeEpisodeHandler(`${title}-episode-${ep}`)
  .then(data => {
      const list = [];
   for(var i = 0; i < data[0].servers.length; i++) {
  list.push(`[${data[0].servers[i].name}](https://avi-rana-1718.github.io/Megumin/watch?src=${data[0].servers[i].iframe}&title=${name}&ep=${ep})\n`);
      }
const output = `${title}`;
//SET SRC   
  let adv = new MessageEmbed()
  .setDescription(`**${res[0].title} - Episode ${ep} **\nA total of ${data[0].servers.length} video servers found!\nChoose from the following: \n${list.toString().replace(/,/g,"")}`)
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
