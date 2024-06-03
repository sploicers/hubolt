import { Robot } from "src/robot";

export default function ayylmao(robot: Robot) {
  robot.hear(/\bayy(y*)\b/i, async ({ matches, reply, }) => {
    const additionalYcount = matches[1]?.length ?? 0;
    await reply(`lmao${'o'.repeat(additionalYcount)}`);
  });
}