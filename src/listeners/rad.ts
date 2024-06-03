import { Robot } from "src/robot";

export default function rad(robot: Robot) {
  robot.hear(/\b(rad)\b/i, ({ message }) =>
    robot.react(message, 'call_me_hand'));
}