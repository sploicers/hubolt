import { readdir, } from "fs/promises";
import { CustomMessageHandler, SlackMessage } from "./slack/types";
import { SlackAdapter } from "./slack/slackAdapter";

export class Robot {
	private ignoredUsers: Set<string> = new Set();

	constructor(private adapter: SlackAdapter) {}

	public async boot() {
		this.adapter.initialize(async app => {
			app.use(async ({ context, next }) => {
				if (context.userId) {
					if (!this.caresAbout(context.userId)) {
						return;
					}
				}
				next();
			});
			await app.start();
		});
		await this.loadBrain();
		await this.loadListeners();
	}

	public hear(thing: RegExp | string, onThing: CustomMessageHandler) {
		this.adapter.onMessage(thing, onThing);
	}

	public hearMention(thing: RegExp | string, onThing: CustomMessageHandler) {
		this.adapter.onAppMention(thing, onThing);
	}

	public async react(message: SlackMessage, emoji: string) {
		await this.adapter.reactToMessage(message, emoji);
	}

	public async channelMembers(channel: string) {
		return await this.adapter.listChannelMemberIds(channel);
	}

	public async ignore(userId: string) {
		this.ignoredUsers.add(userId);
	}

	public async notice(userId: string) {
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