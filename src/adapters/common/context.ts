export type MessageHandler = (context: BotContext) => Promise<void>;

export type Message = {
  userId: string,
  channelId: string,
  text: string,
  timestamp: string,
};

export type BotContext = {
  message: Message,
  matches: string[],
  userId?: string,
  post: (text: string) => Promise<void>,
  reply: (text: string) => Promise<void>,
};