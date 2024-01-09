import { Robot } from "src/robot";

const ALOT_OF_URLS: string[] = [
	"https://3.bp.blogspot.com/_D_Z-D2tzi14/S8TffVGLElI/AAAAAAAACxA/trH1ch0Y3tI/s320/ALOT6.png",
	"http://1.bp.blogspot.com/_D_Z-D2tzi14/S8TflwXvTgI/AAAAAAAACxI/qgd1wYcTWV8/s320/ALOT12.png",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2mynEom5JcAZCTGQPmDCfL7rFqDCDn9Dkq03ePZGl14w9bpjCJxUWL09ZqEeV2eRJJsA&usqp=CAU",
	"https://i.kym-cdn.com/photos/images/original/000/177/517/ALOT15.png"
];

export default function alot(robot: Robot) {
	robot.hear(/\b(alot)\b/i, ({ reply }) =>
		reply(ALOT_OF_URLS[Math.floor(Math.random() * ALOT_OF_URLS.length)]));
}