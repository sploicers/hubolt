import { Robot } from "src/robot";

export default function who(robot: Robot) {
	robot.hearMention(/[Ww]ho should (.+)\?$/, async ({ client, context, message, say }) => {
		const randomChannelMember = async () => {
			const channel = message.channel;
			const apiResponse = await client.conversations.members({ channel });
			const members = apiResponse.members ?? [];
			return members[Math.floor((Math.random() * members.length - 1))];
		};

		const thingToBeDone = context.matches[1];
		const designatedThingDoer = await randomChannelMember();
		await say(`<@${designatedThingDoer}> should ${thingToBeDone}.`);
	});
}