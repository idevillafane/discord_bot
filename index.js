import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { discordReply } from './utils/discordReply.js'
dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// client.login("MTAyNDcxMzM0OTIzMTAxODEwNQ.GieRFv.zPKh-7YJxJvGl3ctt280IqxgUjN_RtyZ_1Jgpg");



client.login(process.env.DISCORD_TOKEN);


const __dirname = path.dirname(new URL(import.meta.url).pathname); // Obtener la ruta del directorio actual

const commandsPath = path.join(__dirname, 'commands'); // Obtener la ruta completa de la carpeta 'commands'

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const { default: command } = await import(filePath);

    
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: '¡Hubo un error durante la ejecución de este comando!', ephemeral: true });
            }
            else {
                await interaction.reply({ content: '¡Hubo un error durante la ejecución de este comando!', ephemeral: true });
            }
        }
    } else if (interaction.isModalSubmit()) {

        console.log('Es el que la causa')

       // await interaction.client.execute();

        await discordReply(interaction, 'Información recibida', []);
    } else {
        return;
    }
});
