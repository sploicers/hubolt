import { Robot } from "src/robot";

export default function noticeme(robot: Robot) {
	robot.hearMention(/^notice\s*me(\ssenpai)*$/, async ({ context, }) => {
		robot.notice(context.userId!);
	});
}