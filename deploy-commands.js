import fs from "fs"
import path from "path"
import { REST, Routes } from "discord.js"
import dotenv from 'dotenv'
dotenv.config()

const commands = [];
// Grab all the command files from the commands directory you created earlier




const __dirname = path.dirname(new URL(import.meta.url).pathname); // Obtener la ruta del directorio actual

const commandsPath = path.join(__dirname, 'commands'); // Obtener la ruta completa de la carpeta 'commands'

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);


		const { default: command } = await import(filePath);
		commands.push(command.data.toJSON());
	}


// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.DISCORD_APPLICATION_ID, process.env.DISCORD_GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		process.exit();
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();