
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const express = require('express');
const app = express();

client.once("ready", () => {
  console.log("Ready");
     client.channels.cache.get('936499399385841724').send(`<:reload:936618925062516736> Restarted the bot`);
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
    client.user.setPresence({ activities: [{ name: `slash commands on ${client.guilds.cache.size} servers` }] });
});

const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');

 const { getInfoFromName } = require('myanimelists');
const api = require('gogoanime-xp');

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

  // HELP
	if (commandName === 'help') {
let help = new MessageEmbed()
    .setTitle("Megumin Help")
      .setDescription("Megumin now uses [slash commands](https://discord.com/blog/slash-commands-are-here), visit [V2 announcement](https://avi-rana-1718.github.io/Megumin/blog/V2) for more info.\n\n:newspaper: **Announcements**\n-Removed /advance command\n-New /search & /manual commands\n-Bot rebranded from `Tamako` to `Megumin`\n-V2 now out\n\nList of all commands\n-help\n-anime\n-info\n-search\n-manual")
  .setColor("#E41F7B")
      .setTimestamp()
    
    const inv = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Invite Bot')
					.setStyle('LINK')
        .setURL('https://discord.com/oauth2/authorize?client_id=930092657416470588&permissions=139586820160&scope=bot%20applications.commands'),

				new MessageButton()
					.setLabel('Website')
					.setStyle('LINK')
        .setURL('https://avi-rana-1718.github.io/Megumin/'),
			);
		return interaction.reply({ embeds: [help], components: [inv] });
    
	}
  
  // INFO
  if (commandName === 'info') {
		await interaction.deferReply();
  //Search
  api.search(interaction.options.getString('name'))
  .then(res => {
//Title, Ep length, Ep number
    var title = res[0].id;
var count = res[0].totalEpisodes;
var ep = interaction.options.getNumber('episode');

  getInfoFromName(res[0].title)
    .then(result => {
      const url = result.url;
      
          const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('View on MyAnimeList')
					.setStyle('LINK')
        .setURL(url),
			);
    
let info = new MessageEmbed()
    .setTitle(res[0].title)
    .setDescription(res[0].synopsis)
.setThumbnail(encodeURI(res[0].img))
    .setColor("#E41F7B")
    .addFields(
		{ name: 'Episodes', value: `${count}`, inline: true },
	{ name: 'Status', value: `${res[0].status}`, inline: true }
  )

     interaction.editReply({ embeds: [info], components: [row]  });
 }).catch(error => console.log(error));
  }).catch(err => {
       let error = new MessageEmbed()
       .setTitle("**ERROR**")
.setDescription(`${err}`)
      .setColor("#D0342C")
    .setTimestamp()
  interaction.editReply({ embeds: [error], ephemeral: true });
   });
	}
  
 
  //ANIME
    if (commandName === 'anime') {
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
     client.channels.cache.get('936499399385841724').send(`Request completed. \n ${title}`);
  }).catch(err => {
       let error = new MessageEmbed()
       .setTitle("**ERROR**")
.setDescription(`Invalid search\n${err}\n__Request__:${interaction.options.getString('name')}`)
      .setColor("#D0342C")
    .setTimestamp()
  interaction.editReply({ embeds: [error], ephemeral: true });
   });
    }
  // MANUAL
    if (commandName === 'manual') {
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
    }
  //SEARCH
    if (commandName === 'search') {
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
    }
});

client.login(process.env.token);
