const {
    SlashCommandBuilder,
    EmbedBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-ticket')
        .setDescription('Create the ticket panel'),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle('🎫 Support Center')
            .setDescription(
`Please select a category below to open a ticket.

📌 Available Categories

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
                    .setDescription('Partnership requests')
                    .setValue('partnership'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Staff Report')
                    .setDescription('Report a staff member')
                    .setValue('staff-report'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Staff Application')
                    .setDescription('Apply for staff')
                    .setValue('staff-application'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Minecraft Support')
                    .setDescription('Minecraft related issues')
                    .setValue('minecraft-support'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Bug Report')
                    .setDescription('Report a bug')
                    .setValue('bug-report'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('General Support')
                    .setDescription('General help and support')
                    .setValue('general-support'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Ban Appeal')
                    .setDescription('Appeal a punishment')
                    .setValue('ban-appeal')
            );

        const row = new ActionRowBuilder().addComponents(menu);

        await interaction.channel.send({
            embeds: [embed],
            components: [row]
        });

        await interaction.reply({
            content: '✅ Ticket panel created.',
            ephemeral: true
        });
    }
};
