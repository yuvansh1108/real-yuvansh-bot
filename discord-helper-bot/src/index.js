import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';

const token = process.env.DISCORD_BOT_TOKEN;
const appLoginUrl = process.env.APP_LOGIN_URL;
if (!token) { console.error('Missing DISCORD_BOT_TOKEN environment variable.'); process.exit(1); }
if (!process.env.DISCORD_APPLICATION_ID) { console.error('Missing DISCORD_APPLICATION_ID environment variable.'); process.exit(1); }
if (!appLoginUrl || !/^https:\/\//i.test(appLoginUrl)) { console.error('Set APP_LOGIN_URL to your app HTTPS sign-in URL.'); process.exit(1); }

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, (readyClient) => console.log(`Discord helper ready as ${readyClient.user.tag}`));

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  try {
    if (interaction.commandName === 'help') {
      await interaction.reply({ ephemeral: true, content: ['**Messaging app help**', 'Use `/login` to open the app sign-in page.', 'Sign-in is handled by the app authentication provider; joining this server is not required.', 'Never share passwords, verification codes, or authentication tokens in Discord.'].join('\n') });
    } else if (interaction.commandName === 'login') {
      await interaction.reply({ ephemeral: true, content: `Open the secure sign-in page here: ${appLoginUrl}\nSign-in happens on the app website, not inside this bot.` });
    }
  } catch (error) {
    console.error('Failed to respond to command:', error);
    if (interaction.isRepliable() && !interaction.replied && !interaction.deferred) await interaction.reply({ ephemeral: true, content: 'Sorry, something went wrong. Please try again later.' }).catch(() => {});
  }
});

client.login(token).catch((error) => { console.error('Discord login failed. Check DISCORD_BOT_TOKEN and application settings.', error.message); process.exit(1); });
