export type MessageHandler = (context: BotContext) => Promise<void>;

export type Message = {
  userId: string,
  channelId: string,
  text: string,
  timestamp: string,
};

type MessageActions = {
  post: (text: string) => Promise<void>,
  reply: (text: string) => Promise<void>,
  react: (emoji: string) => Promise<void>,
}

export type BotContext = MessageActions & {
  message: Message,
  matches: string[],
  userId?: string,
};