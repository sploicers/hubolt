import { Robot } from "src/robot";

export default function noticeme(robot: Robot) {
	robot.hearMention(/notice\s?(me)?$/gi, ({ userId }) =>
		robot.notice(userId!));
}