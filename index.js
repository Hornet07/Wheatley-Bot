const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var lastArg
var evalarg
var debug = false;
client.on('message', msg => {
  if(msg.content === 'debug') debug = !debug;
	if (!msg.content.startsWith(config.prefix)) return;

	const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  lastArg = args

  if (debug){
    msg.channel.send(cmd)
    msg.channel.send(args)
  }

  try{
    if(cmd === 'eval'){
      connectArgs()
      var result = eval(evalarg)
      msg.channel.send(result)
    }
  }
  catch(err){
    msg.channel.send(cmd)
    msg.channel.send(args)
    msg.channel.send(connectArgs())
  }

});

client.login(process.env.TOKEN);

function connectArgs(){
  lastArg.forEach(element => {
    evalarg += element + " "
  });
}