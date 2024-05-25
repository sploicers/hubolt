import { readdir, } from "fs/promises";
import { IBotAdapter } from "./adapters/common/IBotAdapter";
import { MessageHandler } from "./adapters/common/context";
import { SlackMessage } from "./adapters/slack/types";
import { SlackAdapter } from "./adapters/slack/slackAdapter";

export class Robot<MessageType, Adapter extends IBotAdapter<MessageType>> {
  constructor(private adapter: Adapter) {}

  public async boot(): Promise<void> {
    await this.adapter.initialize();
    await this.loadListeners();
  }

  public hear(thing: RegExp | string, onThing: MessageHandler<MessageType>): void {
    this.adapter.onMessage(thing, onThing);
  }

  public hearMention(thing: RegExp | string, onThing: MessageHandler<MessageType>): void {
    this.adapter.onAppMention(thing, onThing);
  }

  public async react(message: MessageType, emoji: string): Promise<void> {
    await this.adapter.reactToMessage(message, emoji);
  }

  public channelMembers(channel: string): Promise<string[]> {
    return this.adapter.listChannelMemberIds(channel);
  }

  private async loadListeners(): Promise<void> {
    const directory = `${__dirname}/listeners`;
    for (const file of await readdir(directory)) {
      const module = await import(`${directory}/${file}`.replace('.ts', ''));
      module.default(this);
    }
  }
}

type SlackBot = Robot<SlackMessage, SlackAdapter>;
export type GenericRobot = SlackBot;