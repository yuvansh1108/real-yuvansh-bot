import 'dotenv/config';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';

const token = process.env.DISCORD_BOT_TOKEN;
const applicationId = process.env.DISCORD_APPLICATION_ID;
const guildId = process.env.DISCORD_GUILD_ID;
if (!token || !applicationId) { console.error('Set DISCORD_BOT_TOKEN and DISCORD_APPLICATION_ID.'); process.exit(1); }

const commands = [
  new SlashCommandBuilder().setName('help').setDescription('Get help using the messaging app'),
  new SlashCommandBuilder().setName('login').setDescription('Get the secure link to sign in to the messaging app')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);
try {
  if (guildId) {
    await rest.put(Routes.applicationGuildCommands(applicationId, guildId), { body: commands });
    console.log('Registered development slash commands for guild ' + guildId);
  } else {
    await rest.put(Routes.applicationCommands(applicationId), { body: commands });
    console.log('Registered global slash commands. They may take a little while to appear.');
  }
} catch (error) { console.error('Could not register commands:', error.message); process.exit(1); }
