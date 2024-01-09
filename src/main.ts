import config, { BotConfig } from './config';
import {Robot } from './robot';
import { SlackAdapter } from './slack/slackAdapter';
import { App, LogLevel } from '@slack/bolt';

async function main() {
	const slackAdapter = createSlackAdapter(config);
	await new Robot(slackAdapter).boot();
}

function createSlackAdapter(config: BotConfig) {
	const app = new App({
		logLevel: LogLevel.DEBUG,
		token: config.slackBotUserOAuthToken,
		botUserId: config.slackBotUserId,
		clientId: config.slackClientId,
		clientSecret: config.slackClientSecret,
		socketMode: true,
		ignoreSelf: true,
		appToken: config.slackAppToken,
	});
	return new SlackAdapter(app);
}

main();