import { App, AppOptions, directMention, } from '@slack/bolt';
import { SlackMessage, SlackMiddlewareArgs, } from './types';
import { BotAdapter, } from '../common/adapter';
import { BotContext, Message, MessageHandler, } from '../common/context';
import { genericMessageEventsOnly, } from './middleware';
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

  public async onMessage(regex: RegExp | string, handler: MessageHandler): Promise<void> {
    this.app.message(genericMessageEventsOnly(), regex, args => handler(this.createContext(args)));
  }

  public async onAppMention(regex: RegExp | string, handler: MessageHandler): Promise<void> {
    this.app.message(directMention(), regex, args => handler(this.createContext(args)));
  }

  protected normalizeMessage(message: SlackMessage): Message {
    assert(message.subtype === undefined || message.subtype === 'bot_message');
    return {
      channelId: message.channel,
      userId: message.subtype === undefined ? message.user : message.user ?? message.bot_id,
      text: message.text ?? '',
      timestamp: message.ts,
    };
  }

  private createContext(args: SlackMiddlewareArgs): BotContext {
    const { context, message, say, } = args;
    const matches: string[] = context.matches ?? [];
    const userId = context.userId;

    const actions = {
      post: async (text: string) => {
        await say(text)
      },
      reply: async (text: string) => {
        await say({ text, thread_ts: message.ts, });
      },
      react: async (emoji: string) => {
        const { channel, ts: timestamp } = message;
        await this.app.client.reactions.add({ channel, timestamp, name: emoji, });
      },
    };
    return {
      message: this.normalizeMessage(message),
      matches,
      userId,
      ...actions,
    };
  }
}
