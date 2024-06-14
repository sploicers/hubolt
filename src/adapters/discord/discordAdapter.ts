import { BotAdapter, } from "../common/adapter";
import { BotContext, Message, MessageHandler, } from "../common/context";
import { DiscordClientOptions, DiscordMessage, } from "./types";
import { Client, Events, } from 'discord.js';

export class DiscordAdapter extends BotAdapter<DiscordMessage> {
  private client: Client;

  constructor(protected options: DiscordClientOptions) {
    super();
    this.client = new Client(options);
  }

  public async initialize(): Promise<void> {
    await this.client.login(this.options.token);
  }

  public async listChannelMemberIds(channelId: string): Promise<string[]> {
    const channel = this.client.channels.cache.find(c => c.id === channelId);
    if (channel !== undefined) {
      const memberLookupAllowed = !(channel.isDMBased() || channel.isThread());
      if (memberLookupAllowed) {
        return [...channel.members.keys()];
      }
    }
    return [];
  }

  public async onMessage(regex: string | RegExp, handler: MessageHandler): Promise<void> {
    this.ifMessageMatches(
      regex,
      message => handler(this.createMessageContext(regex, message)),
    );
  }

  public async onAppMention(regex: string | RegExp, handler: MessageHandler): Promise<void> {
    this.ifMessageMentionsBot(
      message => handler(this.createMessageContext(regex, message)),
    );
  }

  protected normalizeMessage(message: DiscordMessage): Message {
    return {
      userId: message.author.id,
      channelId: message.channelId,
      text: message.content,
      timestamp: message.createdTimestamp.toString(),
    };
  }

  private ifMessageMatches(regex: string | RegExp, action: (message: DiscordMessage) => void) {
    this.client.on(Events.MessageCreate, message => {
      if (message.content.match(regex) !== null) {
        action(message);
      }
    });
  }

  private ifMessageMentionsBot(action: (message: DiscordMessage) => void) {
    this.client.on(Events.MessageCreate, message => {
      const botUser = this.client.user?.id;
      if (botUser !== undefined && message.mentions.has(botUser)) {
        action(message);
      }
    });
  }

  private createMessageContext(regex: string | RegExp, message: DiscordMessage): BotContext {
    const matches = (message.content.match(regex) ?? []) as string[];
    const userId = message.author.id;

    const actions = {
      post: async (text: string) => {
        await message.channel.send(text);
      },
      reply: async (text: string) => {
        await message.reply(text);
      },
      react: async (emoji: string) => {
        await message.react(emoji);
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