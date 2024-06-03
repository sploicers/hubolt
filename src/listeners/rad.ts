import { Robot, } from "src/robot";

export default function rad(robot: Robot) {
  robot.hear(/\b(rad)\b/i, ({ react, }) =>
    react('call_me_hand'));
}