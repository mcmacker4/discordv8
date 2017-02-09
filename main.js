const Discord = require('discord.js');
const client = new Discord.Client();

const child_process = require("child_process")

const token = require("./token")["token"];

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
    let match = /\`\`\`(javascript|js)\n((.|\n)*)\n\`\`\`/igm.exec(message.content);
    if(match) {
        let code = match[2];
        let result = "";

        let child = child_process.fork(
            "./runner.js",
            [code],
            {silent: true}
        );
        child.stdout.on('data', (data) => {
            result += data;
        });
        child.stderr.on('data', (data) => {
            result += data;
        });
        child.on('exit', () => {
            message.reply("```\n" + result + "\n```");
        });
    }
});

client.login(token);
