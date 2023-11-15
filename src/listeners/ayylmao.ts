import { Robot } from "src/robot";

export default function ayylmao(robot: Robot) {
	robot.hear(/\bayy(y*)\b/i, async ({ context, say, }) => {
		const additionalYcount = context.matches[1]?.length ?? 0;
		await say(`lmao${'o'.repeat(additionalYcount)}`);
	});
}