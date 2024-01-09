import { Robot } from "src/robot";

export default function ignoreme(robot: Robot) {
	robot.hearMention(/ignore\s?(me)?$/gi, ({ userId }) =>
		robot.ignore(userId!));
}