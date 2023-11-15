import { Robot } from "src/robot";
import { App as Slack, directMention } from "@slack/bolt";

export default function ignoreme(robot: Robot, slack: Slack) {
	slack.message(directMention(), /ignore\s*me(\splease)*$/g, async ({context}) => {
		robot.ignore(context.userId!);
	});
}