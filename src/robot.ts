import { LogLevel, App as Slack} from "@slack/bolt";
import { BotConfig } from "./config";
import { readdir,  } from "fs/promises";

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

	public async boot(): Promise<void> {
		await this.loadBrain();
		await this.slack.start();
		await this.loadListeners();
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
		for (const file of  await readdir(directory)) {
			const module = await import(`${directory}/${file}`.replace('.ts', ''));
			module.default(this, this.slack);
		}
	}

	private async loadBrain() {}
}