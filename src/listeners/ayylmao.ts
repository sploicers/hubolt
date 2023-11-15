import { Robot } from "src/robot";
import { App as Slack } from "@slack/bolt";

export default function ayylmao(_: Robot, slack: Slack) {
	slack.message(/\bayy(y*)\b/i, async ({ context, say }) => {
		const additionalYcount = context.matches[1]?.length ?? 0;
		await say(`lmao${'o'.repeat(additionalYcount)}`);
	});
}