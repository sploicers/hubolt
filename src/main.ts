import config from './config';
import { Robot } from './robot';
import { DiscordAdapter } from './adapters/discord/discordAdapter';
import { GatewayIntentBits } from 'discord.js';

async function main() {
  const adapter = new DiscordAdapter({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
    token: config.discordToken,
  })
  await new Robot(adapter).boot();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});