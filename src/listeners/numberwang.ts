import { GenericRobot } from "src/robot";

export default function numberwang(robot: GenericRobot) {
  robot.hear(/^\d+$/, async ({ message, }) => {
    const isNumberWang = tenPercentChance();
    if (isNumberWang) {
      await robot.react(message, 'numberwang');
    }
  });
}

const tenPercentChance = () => Math.floor(Math.random() * 10) === 0;