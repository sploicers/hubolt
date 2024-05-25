import { MessageHandler } from "./context";

export interface IBotAdapter<MessageType> {
  initialize(): Promise<void>;
  listChannelMemberIds(channel: string): Promise<string[]>;
  reactToMessage(message: MessageType, emoji: string): Promise<void>;
  onMessage(regex: RegExp | string, handler: MessageHandler<MessageType>): Promise<void>;
  onAppMention(regex: RegExp | string, handler: MessageHandler<MessageType>): Promise<void>;
}