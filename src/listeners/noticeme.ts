import { Robot } from "src/robot";
import { App as Slack, directMention } from "@slack/bolt";

export default function noticeme(robot: Robot, slack: Slack) {
	slack.message(directMention(), /^notice\s*me(\ssenpai)*$/, async ({context}) => {
		robot.notice(context.userId!);
	});
}