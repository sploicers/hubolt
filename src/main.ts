import { Robot } from './robot';
import config from './config';

async function main() {
	await new Robot(config).boot();
}

main();