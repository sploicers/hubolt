import { KnownEventFromType, LogLevel, Middleware, App as Slack, SlackEventMiddlewareArgs, directMention } from "@slack/bolt";
import { BotConfig } from "./config";
import { readdir, } from "fs/promises";

type Message = KnownEventFromType<"message">;
type MessageHandler = Middleware<SlackEventMiddlewareArgs<"message">>;


export class Robot {
	private slack: Slack;
	private ignoredUsers: Set<string> = new Set();

	constructor(private config: BotConfig) {
		this.slack = new Slack({
			logLevel: LogLevel.DEBUG,
			token: this.config.slackBotUserOAuthToken,
			botUserId: this.config.slackBotUserId,
			clientId: this.config.slackClientId,
			clientSecret: this.config.slackClientSecret,
			socketMode: true,
			ignoreSelf: true,
			appToken: this.config.slackAppToken,
		});
	}

	public async boot() {
		await this.loadBrain();

		this.slack.use(async ({ context, next }) => {
			if (context.userId) {
				if (!this.caresAbout(context.userId)) {
					return;
				}
			}
			next();
		});
		await this.slack.start();
		await this.loadListeners();
	}

	public hear(thing: RegExp | string, onThing: MessageHandler) {
		this.slack.message(thing, onThing);
	}

	public hearMention(thing: RegExp | string, onThing: MessageHandler) {
		this.slack.message(directMention(), thing, onThing);
	}

	public async react(message: Message, emoji: string) {
		await this.slack.client.reactions.add({
			channel: message.channel,
			name: emoji,
			timestamp: message.ts,
		});
	}

	public ignore(userId: string) {
		this.ignoredUsers.add(userId);
	}

	public notice(userId: string) {
		this.ignoredUsers.delete(userId);
	}

	public caresAbout(userId: string): boolean {
		return !this.ignoredUsers.has(userId);
	}

	private async loadListeners() {
		const directory = `${__dirname}/listeners`;
		for (const file of await readdir(directory)) {
			const module = await import(`${directory}/${file}`.replace('.ts', ''));
			module.default(this);
		}
	}

	private async loadBrain() { }
}