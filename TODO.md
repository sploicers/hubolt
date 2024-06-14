* Listeners should auto-detect required intents, so that client can mention them in an error on startup if not provided

* Logging to channel via webhook for both errors and debug eventlogs. Wrap the listener definitions in utility functions which
  contain the error handling and intent-checking code, etc.

* DiscordJS emoji support is much more cumbersome than for Slack - do a query on startup for channel emoji and store them for lookup
  by name. At the moment, only specifying the literal unicode emoji or its numeric ID are supported by the library.

* Allow specifying driver type via command line arg to start bot with a specific adapter.

* Redo configuration loading so that only configuration specific to the chosen adapter is required.

* Update README now that bot isn't Slack-specific anymore.