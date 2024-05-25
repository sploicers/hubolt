import config from './config';
import { Robot } from './robot';
import { SlackAdapter } from './adapters/slack/slackAdapter';

async function main() {
  const adapter = new SlackAdapter({
    token: config.slackBotUserOAuthToken,
    botUserId: config.slackBotUserId,
    clientId: config.slackClientId,
    clientSecret: config.slackClientSecret,
    socketMode: true,
    ignoreSelf: true,
    appToken: config.slackAppToken,
  });
  await new Robot(adapter).boot();
}

main();