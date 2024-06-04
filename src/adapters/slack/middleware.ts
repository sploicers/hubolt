import { Middleware, SlackEventMiddlewareArgs, } from "@slack/bolt";

export function genericMessageEventsOnly(): Middleware<SlackEventMiddlewareArgs<'message'>> {
  return ({ event, next, }) => {
    if (event.subtype === undefined) {
      next();
    }
    return Promise.resolve();
  };
}