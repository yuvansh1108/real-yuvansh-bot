# Local test and deployment

## 1. Discord Developer Portal
1. Create/select the bot application.
2. Copy its **Application ID** from General Information.
3. Under **Bot**, generate a bot token and keep it private.
4. Under Installation, configure Guild Install with the `bot` and `applications.commands` scopes. Keep permissions minimal; slash commands for this starter don't need message-content access or Administrator.
5. For a private test server, create an invite URL and add the bot to that server.

## 2. Configure environment
Set these in your local environment or hosting provider's secret settings:
- `DISCORD_BOT_TOKEN`
- `DISCORD_APPLICATION_ID`
- `APP_LOGIN_URL` (HTTPS sign-in URL for your app)
- Optional `DISCORD_GUILD_ID` (test server ID so commands register quickly)

Never commit a real `.env`, bot token, Discord OAuth client secret, or Clerk secret key.

## 3. Start and register
Requires Node.js 20 or newer:
```bash
npm install
npm run register-commands
npm start
```
Set `DISCORD_GUILD_ID` for quick guild-only testing. Remove that variable to register the commands globally.

## 4. Hosting
Deploy this folder as a long-running Node.js worker/service (not a static site). Set the environment variables in the host's Secrets/Environment settings and use:
- Build/install: `npm install`
- Start: `npm start`
- One-time command registration: `npm run register-commands`

The process must be allowed to stay running for the bot to receive Discord interactions.

## 5. Important auth boundary
This bot only provides help and a sign-in link. Clerk OAuth handles Discord sign-in independently. A user does not have to join a Discord server to use Discord sign-in. Do not use a Discord user ID or command interaction as a substitute for a verified Clerk session.
