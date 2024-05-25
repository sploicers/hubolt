export type MessageHandler<MessageType> = (context: BotContext<MessageType>) => Promise<void>;

export type BotContext<MessageType> = {
  message: MessageType,
  matches: string[],
  userId?: string,
  post: (text: string) => Promise<void>,
  reply: (text: string) => Promise<void>,
}