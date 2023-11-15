import { Robot } from "src/robot";

export default function ignoreme(robot: Robot) {
	robot.hearMention(/ignore\s*me(\splease)*$/g, async ({ context, }) => {
		robot.ignore(context.userId!);
	});
}