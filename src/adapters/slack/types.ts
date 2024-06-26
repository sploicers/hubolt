import { AllMiddlewareArgs, KnownEventFromType, SlackEventMiddlewareArgs, } from "@slack/bolt";
import { StringIndexed, } from "@slack/bolt/dist/types/helpers";
export type SlackMessage = KnownEventFromType<"message">;
export type SlackMiddlewareArgs = SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs<StringIndexed>;