import { Robot } from "src/robot";

export default function numberwang(robot: Robot) {
  robot.hear(/^\d+$/, async ({ message, }) => {
    const isNumberWang = tenPercentChance();
    if (isNumberWang) {
      await robot.react(message, 'numberwang');
    }
  });
}

const tenPercentChance = () => Math.floor(Math.random() * 10) === 0;