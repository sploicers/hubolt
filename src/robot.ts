import { readdir, } from "fs/promises";
import { IBotAdapter } from "./adapters/common/adapter";
import { Message, MessageHandler } from "./adapters/common/context";

export class Robot {
  constructor(private adapter: IBotAdapter) {}

  public async boot(): Promise<void> {
    await this.adapter.initialize();
    await this.loadListeners();
  }

  public hear(thing: RegExp | string, onThing: MessageHandler): void {
    this.adapter.onMessage(thing, onThing);
  }

  public hearMention(thing: RegExp | string, onThing: MessageHandler): void {
    this.adapter.onAppMention(thing, onThing);
  }

  public async react(message: Message, emoji: string): Promise<void> {
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