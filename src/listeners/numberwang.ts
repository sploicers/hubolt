import { Robot, } from "src/robot";

export default function numberwang(robot: Robot) {
  robot.hear(/^\d+$/, async ({ react, }) => {
    const isNumberWang = tenPercentChance();
    if (isNumberWang) {
      await react('numberwang');
    }
  });
}

const tenPercentChance = () => Math.floor(Math.random() * 10) === 0;