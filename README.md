# Hubolt

Hubolt (working title) is a chatbot for Slack. It's heavily inspired by [Hubot](https://hubot.github.com/), but makes use of Slack's [Bolt SDK](https://github.com/SlackAPI/bolt-js).

Currently, it just listens for message events in channels based on a regex, and responds with a message or reacts with an emoji.  
It is planned to add persistent storage support in the near future, and move towards a more explicitly plugin-based architecture.


## Contributing

#### Configuration

* Create a file named `.env` in the root directory, based on the template provided in `.env.example`.
* [Create an app integration with your Slack workspace](https://api.slack.com/apps) and fill in the values as appropriate.

#### Building/running
* `yarn build`, or
* `yarn start` (will also run a build)

#### Adding a new listener

Create a new TypeScript file under the `listeners` directory similar to the following:

```TypeScript
import { Robot } from "src/robot";

export default function echo(robot: Robot) {
	robot.hear(/.+/gmi, async ({ message, say, }) => {
		await say(message.text);
	});
}
```

This will automatically be picked up when running the app - it scans for and loads all TypeScript files from this directory.  
Note that your listener function must be a default export. See any of the existing listeners for examples.