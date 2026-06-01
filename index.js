const { Client, GatewayIntentBits } = require('discord.js');

console.log('Bot starting...');
console.log('TOKEN EXISTS:', !!process.env.TOKEN);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`${client.user.tag} is online!`);
});

client.on('error', console.error);

client.login(process.env.TOKEN)
  .then(() => {
    console.log('Login successful!');
  })
  .catch((err) => {
    console.error('LOGIN ERROR:');
    console.error(err);
    process.exit(1);
  });
