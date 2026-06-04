const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'setup-ticket',
        description: 'Create the ticket panel'
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {

        console.log('Started refreshing application commands.');

        await rest.put(
            Routes.applicationGuildCommands(
                '1511077438732369971',
                '1282249688489136150'
            ),
            { body: commands }
        );

        console.log('Successfully reloaded application commands.');

    } catch (error) {
        console.error(error);
    }
})();
