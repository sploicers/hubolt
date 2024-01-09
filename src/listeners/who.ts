import { Robot } from "src/robot";

export default function who(robot: Robot) {
	robot.hearMention(/who should (.+)\?$/i, async ({ matches, message, post }) => {
		const randomChannelMember = async () => {
			const members = await robot.channelMembers(message.channel);
			return members[Math.floor((Math.random() * members.length - 1))];
		};
		const thingToBeDone = matches[1];
		const designatedThingDoer = await randomChannelMember();
		await post(`<@${designatedThingDoer}> should ${thingToBeDone}.`);
	});
}