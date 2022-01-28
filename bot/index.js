const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});


app.listen(3000, () => {
  console.log('server started');
});

let Discord = require("discord.js");
let client = new Discord.Client;


client.on("ready", () => {
  console.log("ready");
  client.channels.cache.get('936499399385841724').send(`
<:reload:936618925062516736> Restarted bot.`);
  client.user.setPresence({ activity: { name: "!help" } });
});

const prefix ="!";
const api = require('gogoanime-xp');

client.on("message", async (message) => {

if (message.content == `${prefix}help`) {
  let help = new Discord.MessageEmbed()
    .setTitle("Help")
    .setDescription("Prefix:`!`\n`help`\n`anime <args>`\n`advance <args>`\n __Images for reference__: [anime](https://media.discordapp.net/attachments/935080227086946365/936224748734652466/IMG_20220124_134540.jpg) , [advance](https://media.discordapp.net/attachments/935080227086946365/936224748495589417/IMG_20220124_134603.jpg)")
  .setColor("#E41F7B")
  message.channel.send(help);
}
  if( message.content.includes(`${prefix}anime`)) {
const precom = `${prefix}anime`;
    	const args = message.content.slice(precom.length).trim().replace(/ /g,"-");
  console.log(args);
    const command = args.toLowerCase();
  //ANIME DATA SERVR
    api.search(command)
  .then(res => {
    var count = Object.keys(res[0].episodes).length;
    console.log(count);
var title = res[0].id;
  //ANIME INFO
    let info = new Discord.MessageEmbed()
    .setTitle(res[0].title)
    .setDescription(res[0].synopsis)
    .setThumbnail(res[0].img)
    .setColor("#E41F7B")
    message.channel.send(info);
  //EPISODE LENGTH
  let epembed = new Discord.MessageEmbed()
  .setDescription(`Which episode do you want to play? ${count} episodes found.`)
          .setFooter('Specific the episode number')
          .setTimestamp()
          .setColor("#E41F7B")
      message.channel.send(epembed);

  const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        collector.on('collect', message => {
          var ep = message.content;

message.channel.startTyping();

  api.animeEpisodeHandler(`${title}-episode-${ep}`)
  .then(info => {
const output = `${title}`;
console.log(`${command}-episode-${ep}`)
console.log(output);
api.search(output)
  .then(data =>{

    message.channel.stopTyping();

 if (info[0].servers[0].name == "Streamsb") {
let pembed = new Discord.MessageEmbed()
    .setTitle(`**${data[0].title}**`)
    .setDescription(`Episode ${ep}\n**Watch**: [Link](https://tamako.gq/watch?src=${info[0].servers[0].iframe}&title=${title}&ep=${ep})`)
      .setColor("#E41F7B")
      .setFooter("Use !advance if the default source doesn't work.")
    .setTimestamp()
    message.channel.send(pembed)
    } else if (info[0].servers[1].name == "Streamsb") {
let pembed = new Discord.MessageEmbed()
    .setTitle(`**${data[0].title}**`)
    .setDescription(`Episode ${ep}\n**Watch**: [Link](https://tamako.gq/watch?src=${info[0].servers[1].iframe}&title=${title}&ep=${ep})`)
      .setColor("#E41F7B")
      .setFooter("Use !advance if the default source doesn't work.")
    .setTimestamp()
    message.channel.send(pembed)
    } else if (info[0].servers[2].name == "Streamsb") {
let pembed = new Discord.MessageEmbed()
    .setTitle(`**${data[0].title}**`)
    .setDescription(`Episode ${ep}\n**Watch**: [Link](https://tamako.gq/watch?src=${info[0].servers[2].iframe}&title=${title}&ep=${ep})`)
      .setColor("#E41F7B")
      .setFooter("Use !advance if the default source doesn't work.")
    .setTimestamp()
    message.channel.send(pembed)
    } else if (info[0].servers[3].name == "Streamsb") {
let pembed = new Discord.MessageEmbed()
    .setTitle(`**${data[0].title}**`)
    .setDescription(`Episode ${ep}\n**Watch**: [Link](https://tamako.gq/watch?src=${info[0].servers[3].iframe}&title=${title}&ep=${ep})`)
      .setColor("#E41F7B")
            .setFooter("Use !advance if the default source doesn't work.")
    .setTimestamp()
    message.channel.send(pembed)
    } else if (info[0].servers[4].name == "Xstreamcdn") {
let pembed = new Discord.MessageEmbed()
    .setTitle(`**${data[0].title}**`)
    .setDescription(`Episode ${ep}\n**Watch**: [Link](https://tamako.gq/watch?src=${info[0].servers[4].iframe}&title=${title}&ep=${ep})`)
      .setColor("#E41F7B")
            .setFooter("Use !advance if the default source doesn't work.")
    .setTimestamp()
    message.channel.send(pembed)
    } else if (info[0].servers[5].name == "Xstreamcdn") {
let pembed = new Discord.MessageEmbed()
    .setTitle(`**${data[0].title}**`)
    .setDescription(`Episode ${ep}\n**Watch**: [Link](https://tamako.gq/watch?src=${info[0].servers[5].iframe}&title=${title}&ep=${ep})`)
      .setColor("#E41F7B")
            .setFooter("Use !advance if the default source doesn't work.")
    .setTimestamp()
    message.channel.send(pembed)
    }

 }).catch(err => {
   message.channel.send("`Error` | Episode not found.");
    client.channels.cache.get('936499399385841724').send(`
<:cancel:936620265264271410> Error | Invaild Episode\n ${err}`);
 });
        }).catch(err => {
          message.channel.stopTyping();
   message.channel.send("`Error` | Episode not found.");
    client.channels.cache.get('936499399385841724').send(`
<:cancel:936620265264271410> Error | Invaild Episode\n ${err}`);
 });

});
    }).catch(err => {
      message.channel.send("`Error` | Invalid search");
      client.channels.cache.get('936499399385841724').send(`
<:cancel:936620265264271410> Error | Invaild search\n ${err}`);
    });
}
// PLAY EPISODE

  //Advance
  if (message.content.includes(`${prefix}advance`)) {
  
const advcommand = `!advance`;
    	const advarg = message.content.slice(advcommand.length).trim().replace(/ /g,"-");
        const advinput = advarg.toLowerCase();
    console.log(advinput);
  
 api.animeEpisodeHandler(advinput)
  .then(res =>{
  const advoutput = advinput.split("episode");
api.search(advoutput[0])
  .then(data =>{
    var title = data[0].title.replace(/ /g,"-");
  let advembed = new Discord.MessageEmbed()
      .addFields(
        {name:`${res[0].servers[0].name}`, value:`${res[0].servers[0].iframe}`},
        {name:`${res[0].servers[1].name}`, value:`${res[0].servers[1].iframe}`},
        {name:`${res[0].servers[2].name}`, value:`${res[0].servers[2].iframe}`},
        {name:`${res[0].servers[3].name}`, value:`${res[0].servers[3].iframe}`},
        {name:`${res[0].servers[4].name}`, value:`${res[0].servers[4].iframe}`},
)
      .setColor("#E41F7B")
    .setTimestamp()
    message.channel.send(advembed);
  }).catch(() => message.channel.send("`Error` | Episode not found."));


  });
        }
        
        if (message.content == "!servers") {
           client.guilds.cache.forEach(guild => {
        guild.channels.cache.filter(x => x.type != "category").random().createInvite()
          .then(inv => console.log(`${guild.name} | ${inv.url}`));
      });
        }
  });

  client.login(process.env.token);
