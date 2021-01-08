const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var debug = true;
client.on('message', msg => {
  if(msg.content === 'debug') debug = !debug;
  if(!msg.content.startsWith(config.prefix)) return;
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/) //I have no idea what / +/ means lol
  const cmd = args.shift()

  if(debug){
    msg.channel.send(args)
    msg.channel.send(cmd)
  }
  
  if(cmd === 'eval') {
    var result = eval(args[0])
    msg.channel.send(result)
  }
  //for(){}
});

client.login(process.env.TOKEN);