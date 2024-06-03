import { App, AppOptions, directMention, } from '@slack/bolt';
import { SlackMessage, SlackMiddlewareArgs, } from './types';
import { BotAdapter, } from '../common/adapter';
import { BotContext, Message, MessageHandler, } from '../common/context';
import assert from 'assert';

export class SlackAdapter extends BotAdapter<SlackMessage> {
  private app: App;

  constructor(options: AppOptions) {
    super();
    this.app = new App(options);
  }

  public async initialize(): Promise<void> {
    await this.app.start();
  }

  public async listChannelMemberIds(channel: string): Promise<string[]> {
    const apiResponse = await this.app.client.conversations.members({ channel, });
    return apiResponse.members ?? [];
  }

  public async reactToMessage(message: Message, emoji: string): Promise<void> {
    const { channelId: channel, timestamp, } = message;
    await this.app.client.reactions.add({ channel, timestamp, name: emoji, });
  }

  public async onMessage(regex: RegExp | string, handler: MessageHandler): Promise<void> {
    this.app.message(regex, args => handler(this.createContext(args)));
  }

  public async onAppMention(regex: RegExp | string, handler: MessageHandler): Promise<void> {
    this.app.message(directMention(), regex, args => handler(this.createContext(args)));
  }

  protected normalizeMessage(message: SlackMessage): Message {
    // TODO - seems like we need to tell the type system that this is a GenericMessageEvent,
    // otherwise fields like userId, text, and many more are not accessible. There must be a
    // cleaner way of achieving this.
    assert(
      message.subtype === undefined,
      'Bot received a Slack message event with the subtype set - this should never happen.'
    );
    return {
      channelId: message.channel,
      userId: message.user,
      text: message.text ?? '',
      timestamp: message.ts,
    };
  }

  private createContext(args: SlackMiddlewareArgs): BotContext {
    const { context, message, say, } = args;
    const matches: string[] = context.matches ?? [];
    const userId = context.userId;

    const post = async (text: string) => {
      await say(text)
    };
    const reply = async (text: string) => {
      await say({ text, thread_ts: message.ts, });
    };

    return {
      message: this.normalizeMessage(message), matches, userId, post, reply,
    };
  }
}
