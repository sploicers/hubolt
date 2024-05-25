import { AllMiddlewareArgs, KnownEventFromType, SlackEventMiddlewareArgs } from "@slack/bolt";
import { StringIndexed } from "@slack/bolt/dist/types/helpers";
import { BotContext, MessageHandler } from '../common/context';

export type SlackMessage = KnownEventFromType<"message">;
export type SlackMiddlewareArgs = SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs<StringIndexed>;
export type SlackBotContext = BotContext<SlackMessage>;
export type SlackMessageHandler = MessageHandler<SlackMessage>;
