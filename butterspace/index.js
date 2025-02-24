// Import library discord.js
const discord = require('discord.js');
const os = require('os');
const moment = require('moment')

// Buat instance client bot
const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.MessageContent,
    ],
});

// Event: Bot siap dan terhubung ke Discord
client.once('ready', () => {
    console.log(`Bot ${client.user.tag} sudah online!`);

    setInterval(() => {
        const channel = client.channels.cache.get('CHANNEL_ID'); // Ganti dengan ID Channel yang sesuai

        if (channel) {

            const core = os.cpus()[0]
            const users = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString();
            let uptime = moment.duration(client.uptime);
            sec = uptime.seconds() == 1 ? `${uptime.seconds()} seconds` : `${uptime.seconds()} seconds`;
            min = uptime.minutes() == 1 ? `${uptime.minutes()} minutes` : `${uptime.minutes()} minutes`;
            hr = uptime.hours() == 1 ? `${uptime.hours()} hours` : `${uptime.hours()} hours`;
            days = uptime.days() == 1 ? `${uptime.days()} days` : `${uptime.days()} days`;

            channel.send({
                embeds: [
                    new discord.EmbedBuilder()
                        .setAuthor({ name: "Butterspace", iconURL: client.user.displayAvatarURL() })
                        .setColor('#A9E9F6')
                        .addFields(
                            {
                                name: 'CPU Info',
                                value: `\`CPU Model: ${core.model} \n CPU Cores: ${os.cpus().length} \n CPU Speed: ${core.speed / 1000} GHz\``,
                                inline: true,
                            },
                            {
                                name: 'Uptime',
                                value: `\`${days}, ${hr}, ${min} and ${sec}\``,
                                inline: true,
                            },
                        )
                        .setFooter({ text: `Spacebutter v13` })
                ]
            })
        }
    }, 300000); // 300000 ms = 5 menit
});


const commands = [
    {
        name: 'halo',
        description: 'Hai!',
    },
];

const rest = new discord.REST({ version: '10' }).setToken('TOKEN');

async function refreshCommands() {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(discord.Routes.applicationCommands('CHANNEL_ID'), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

// Panggil fungsi async
refreshCommands();

client.on(discord.Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hola') {
        await interaction.reply('halo!');
    }
});

// Event: Ketika ada pesan dikirim di server
client.on('messageCreate', async (message) => {
    // Jangan respon jika pesan dikirim oleh bot
    if (message.author.bot) return;

    // Respon jika pesan adalah "!halo"
    if (message.content === '!halo') {
        message.reply('Halo juga!');
    }

    if (message.content === '$ping') {
        const core = os.cpus()[0]
        const users = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString();
        let uptime = moment.duration(client.uptime);
        sec = uptime.seconds() == 1 ? `${uptime.seconds()} seconds` : `${uptime.seconds()} seconds`;
        min = uptime.minutes() == 1 ? `${uptime.minutes()} minutes` : `${uptime.minutes()} minutes`;
        hr = uptime.hours() == 1 ? `${uptime.hours()} hours` : `${uptime.hours()} hours`;
        days = uptime.days() == 1 ? `${uptime.days()} days` : `${uptime.days()} days`;

        await message.reply({
            embeds: [
                new discord.EmbedBuilder()
                    .setAuthor({ name: "Butterspace", iconURL: client.user.displayAvatarURL() })
                    .setColor('#A9E9F6')
                    .addFields(
                        {
                            name: 'CPU Info',
                            value: `\`CPU Model: ${core.model} \n CPU Cores: ${os.cpus().length} \n CPU Speed: ${core.speed / 1000} GHz\``,
                            inline: true,
                        },
                        {
                            name: 'Uptime',
                            value: `\`${days}, ${hr}, ${min} and ${sec}\``,
                            inline: true,
                        },
                    )
                    .setFooter({ text: `butterspace v14` })
            ]
        })
    }

});

// Login bot menggunakan token
client.login('TOKEN');
