const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder
} = require('discord.js');

const { activeTickets } = require('./ticketData');
const config = require('./config');

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

client.on('messageCreate', async message => {

    if (message.author.bot) return;

    if (message.content === '!setup-ticket') {

        const embed = new EmbedBuilder()
            .setTitle('🎫 Support Center')
            .setDescription(
`Please select a category below to open a ticket.

🤝 Partnership
🚨 Staff Report
📝 Staff Application
⛏ Minecraft Support
🐛 Bug Report
❓ General Support
🔨 Ban Appeal

Our staff team will assist you as soon as possible.`
            )
            .setColor('#5865F2');

        const menu = new StringSelectMenuBuilder()
            .setCustomId('ticket_select')
            .setPlaceholder('Select a ticket category')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Partnership')
                    .setValue('partnership'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Staff Report')
                    .setValue('staff-report'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Staff Application')
                    .setValue('staff-application'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Minecraft Support')
                    .setValue('minecraft-support'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Bug Report')
                    .setValue('bug-report'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('General Support')
                    .setValue('general-support'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Ban Appeal')
                    .setValue('ban-appeal')
            );

        const row = new ActionRowBuilder().addComponents(menu);

        await message.channel.send({
            embeds: [embed],
            components: [row]
        });
    }
});

client.on('interactionCreate', async interaction => {

    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId !== 'ticket_select') return;

    console.log(
        `${interaction.user.tag} selected ${interaction.values[0]}`
    );

    await interaction.reply({
        content: `You selected: ${interaction.values[0]}`,
        ephemeral: true
    });
});

client.login(process.env.TOKEN);
