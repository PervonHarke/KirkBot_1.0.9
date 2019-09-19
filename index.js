const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);



const Discord = require('discord.js');
const bot = new Discord.Client();

//do not share this token with anyone else
const token = 'NjIxNjc5ODE0OTUyMDkxNjY5.XXppDQ.ntQuMQPoK11jE4tCFVm8CuoS2Zo';

const PREFIX = '!';
const version = '**1.0.5** WIP';

var fs = require('fs');

//var commandsList = fs.readFileSync('commands.txt', 'utf8');

//var commandsList = fs.readFileSync('Storage/commands.txt', 'utf8');


bot.on('ready' , () => {
    console.log('Alle System sind hochgefahren. Es kann losgehen!');
    bot.user.setActivity('DCS World on -=Kirks Hangar=-' , { tpye: 'PLAYING'}).catch(console.error);
})

bot.on('message' , message=>{
    // searches messages for the " ! " PREFIX that iniates a command for the bot. 
    let args = message.content.substring(PREFIX.length).split(" ");
    
    //Chatfilter
   let blacklisted = ['Nigger','Gas the Jews','Hitler did nothing Wrong','urethra play','neger',]; 
   let foundInText = false;
   for (var i in blacklisted){ //This loops each item blacklisted
       if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
   } //checks if the current item is included in the message
    if (foundInText){
      message.delete();
      //client.sendMessage(msg.author, "I can see you sent a message in: " + msg.channel.name + ", that was blacklisted and there for deleted. Please don't use these words. They are blacklisted for a reason!");
      message.channel.send('Sorry,that word ist blacklisted.' + message.author).then(msg => msg.delete(5000)); 
    }
    
   
    
      
    
    
    switch(args[0]){
        
        //ping pong
        case 'ping' :
            message.channel.send('pong!')
            break;
        
        case 'author' : 
            message.channel.send('I was made by *LTJG Per_von_Harke*')
            break;
        // The bot will send an embed with the Link as the title a little description and a a little text at the bottom of the inbed with the author of the website. 
        case 'website' :
                message.channel.send({embed: {
                    color: 3447003,
                    author: { },
                    title: "**The website for -=Kirks Hangar=-**",
                    url: "http://kuenzel-design.com/kirks-hangar/",
                    description: "*Kirks-Hangar is a public server and community, which is open for everyone, who is interessted in simulation flying. Kirks-Hangar is also the homebase of the BACON Squadron, a naval ops focused DCS squadron, which mainly operates the F/A-18C Lot 20 and the AV8B NA. Our server is located in Germany and is mostly used, to host a freeflight training mission.*  ",

                    timestamp: new Date(),
                    footer: {
                      text: "© -CAPT Kirk CAG BACON Squadron and Admin of Kirks-Hangar. "
                    }
                  }
                });
            break;


        // if only "info" is typed in the bot will respond with an error message else it will answer with the current version.
        case 'info' :
            if (args[1] === 'version'){
                message.channel.send('version:' + version);
            }else{
                message.channel.send('**INVALID COMMAND**')
            }
            break;


        //info over the author
       // case 'info' :
       //     if (args[1] === 'author'){
       //     message.channel.send('Per_von_Harke');
       //     }
       //     break;   
        
        
        //if no "Bacon Staff" role is existing the bot will say it and delet his own message after 5 seconds
         case 'clear' :
            if(!message.member.roles.find(r => r.name === "Bacon Staff")) return message.channel.send('iNsuFficient PERmISsION').then(msg => msg.delete(5000));      
            //if no value is set (how many message should get deleted) the bot will answer.
            if(!args[1]) return message.reply('Error please define second argument!')
            message.channel.bulkDelete(args[1]);
        break;                    
        
        case 'help':  {
            message.channel.send({embed : {
                color: 3447003,
                author: { },
                title: "*AVAILABLE COMMANDS*",
                description: "A list of all available commands to use for normal Members.",
                fields:[{
                    name: "**!website**",
                    value: "Sends an Embed with the Link to the official Kirks Hangar Website."
                },
                   {
                    name: "**!ping**",
                    value: "Makes the bot reply with [pong!]"
                },
                {
                    name: "**!author**",
                    value: "Who made this bot."
                },
                {
                    name: "**!info version**",
                    value: "What version this bot is."
                },
                {
                    name: "**!commands**",
                    value: "Will bring up and embed with commands only available to Bacon Staff."
                },
                        ],
                timestamp: new Date(),
                footer: {
                text: '© -LTJG Per_von_Harke '
                }                
              }
            });  
            break;
        }
        case 'commands':  {
            message.channel.send({embed : {
                color: 3447003,
                author: { },
                title: "*BACON STAFF ONLY COMMANDS*",
                description: "Commands which can only be used by Members with the Role Bacon Staff.",
                fields : [{
                   name: "**!clear [...]**",
                  value: "Type in the number of messages you want to delete instead of [...]",
                }],
                timestamp: new Date(),
                footer: {
                text: '© -LTJG Per_von_Harke '
                }                
              }
            });  
            break;

        
       }
    }
    
})

bot.login(process.env.TOKEN);          //alternativ "token" in die Klammern einsetzen!

