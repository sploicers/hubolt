import { AllMiddlewareArgs, KnownEventFromType, Middleware, SlackEventMiddlewareArgs } from "@slack/bolt";
import { StringIndexed } from "@slack/bolt/dist/types/helpers";

export type SlackMessage = KnownEventFromType<"message">;
export type SlackMessageHandler = Middleware<SlackEventMiddlewareArgs<"message">>;
export type SlackMiddlewareArgs = SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs<StringIndexed>;

export type CustomMessageHandler = (context: CustomContext) => Promise<void>;

export type CustomContext = {
	message: SlackMessage
	matches: string[],
	userId?: string,
	post: (text: string) => Promise<void>,
	reply: (text: string) => Promise<void>,
}