# Discord Helper Bot (starter)

This folder contains the starter blueprint for a separate Discord helper bot for the Chatty Pi/messaging platform. The existing repository is a MakeCode/micro:bit project, so this folder is documentation only; deploy the bot as its own Node.js service/repository.

## First commands

- `/help` — explains the app and where to get support.
- `/login` — replies with the app's sign-in URL. Sign-in is handled by Clerk; a Discord server membership is not required.

## Credentials

Set these server-side environment variables in the bot host:

- `DISCORD_BOT_TOKEN` — bot token from Discord Developer Portal (never commit this value).
- `DISCORD_APPLICATION_ID` — application ID.
- `DISCORD_GUILD_ID` — optional development/test server ID for registering commands quickly.
- `APP_LOGIN_URL` — URL of the messaging app sign-in page.

Never put bot tokens, OAuth client secrets, or Clerk secret keys in frontend code or Git.

## Suggested standalone deployment

Create a dedicated Node.js/TypeScript repository and deploy it as a worker/service that stays running. Do not deploy this bot as a static website/GitHub Pages site. Keep it independent from Clerk so bot downtime cannot affect sign-in.

## Security notes

- Use least-privilege bot permissions; slash commands typically need `applications.commands` and the bot invite permissions it truly uses.
- The bot only provides links/help. It must not attempt to authenticate people itself or infer app access from Discord server membership.
- For production, register global application commands and set `APP_LOGIN_URL` to the legitimate app URL.
