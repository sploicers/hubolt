import { Message, MessageHandler } from "./context";

export interface IBotAdapter {
  initialize(): Promise<void>;
  listChannelMemberIds(channel: string): Promise<string[]>;
  reactToMessage(message: Message, emoji: string): Promise<void>;
  onMessage(regex: RegExp | string, handler: MessageHandler): Promise<void>;
  onAppMention(regex: RegExp | string, handler: MessageHandler): Promise<void>;
}

export abstract class BotAdapter<MessageType> implements IBotAdapter {
  public abstract initialize(): Promise<void>;
  public abstract listChannelMemberIds(channel: string): Promise<string[]>;
  public abstract reactToMessage(message: Message, emoji: string): Promise<void>;
  public abstract onMessage(regex: RegExp | string, handler: MessageHandler): Promise<void>;
  public abstract onAppMention(regex: RegExp | string, handler: MessageHandler): Promise<void>;

  protected abstract normalizeMessage(message: MessageType): Message
}