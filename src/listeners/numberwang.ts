import { Robot } from "src/robot";

export default function numberwang(robot: Robot) {
    robot.hear(/^\d+$/, async ({ message, }) =>
        await robot.react(message, 'numberwang'));
}