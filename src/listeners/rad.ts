import { GenericRobot } from "src/robot";

export default function rad(robot: GenericRobot) {
  robot.hear(/\b(rad)\b/i, ({ message }) =>
    robot.react(message, 'call_me_hand'));
}