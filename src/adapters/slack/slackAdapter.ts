import { App, AppOptions, directMention } from '@slack/bolt';
import { SlackBotContext, SlackMessage, SlackMessageHandler, SlackMiddlewareArgs } from './types';
import { IBotAdapter } from '../common/IBotAdapter';

export class SlackAdapter implements IBotAdapter<SlackMessage> {
  private app: App;

  constructor(options: AppOptions) {
    this.app = new App(options);
  }

  public async initialize(): Promise<void> {
    await this.app.start();
  }

  public async listChannelMemberIds(channel: string): Promise<string[]> {
    const apiResponse = await this.app.client.conversations.members({ channel });
    return apiResponse.members ?? [];
  }

  public async reactToMessage(message: SlackMessage, emoji: string): Promise<void> {
    const { channel, ts } = message;
    await this.app.client.reactions.add({ channel, timestamp: ts, name: emoji });
  }

  public async onMessage(regex: RegExp | string, handler: SlackMessageHandler): Promise<void> {
    this.app.message(regex, args => handler(this.createContext(args)));
  }

  public async onAppMention(regex: RegExp | string, handler: SlackMessageHandler): Promise<void> {
    this.app.message(directMention(), regex, args => handler(this.createContext(args)));
  }

  private createContext(args: SlackMiddlewareArgs): SlackBotContext {
    const { context, message, say } = args;
    const matches: string[] = context.matches ?? [];
    const userId = context.userId;
    const post = (text: string) => say(text).then(_ => {});
    const reply = (text: string) => say({ text, thread_ts: message.ts }).then(_ => {});
    return { message, matches, userId, post, reply, };
  }
}