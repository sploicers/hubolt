import { Robot } from "src/robot";

export default function rad(robot: Robot) {
    robot.hear(/\b(rad)\b/i, async ({ message, }) =>
        await robot.react(message, 'call-me-hand'));
}