import dotenv from 'dotenv';

type ServiceConfiguration = NodeJS.ProcessEnv;
type PartialConfiguration = Partial<ServiceConfiguration>;

export class BotConfig {
  constructor(
    private config: ServiceConfiguration,
    private defaults: PartialConfiguration = {},
  ) {
    dotenv.config();
  }

  public get slackApplicationId() {
    return this.getConfigValue('SLACK_APPLICATION_ID');
  }
  public get slackClientId() {
    return this.getConfigValue('SLACK_CLIENT_ID');
  }
  public get slackClientSecret() {
    return this.getConfigValue('SLACK_CLIENT_SECRET');
  }
  public get slackAppToken() {
    return this.getConfigValue('SLACK_APP_LEVEL_TOKEN');
  }
  public get slackBotUserOAuthToken() {
    return this.getConfigValue('SLACK_BOT_USER_OAUTH_TOKEN');
  }
  public get slackBotUserId() {
    return this.getConfigValue('SLACK_BOT_USER_ID');
  }
  public get slackUserOAuthToken() {
    return this.getConfigValue('SLACK_USER_OAUTH_TOKEN');
  }
  public get discordToken() {
    return this.getConfigValue('DISCORD_TOKEN');
  }

  private getConfigValue(key: keyof ServiceConfiguration): string {
    const value = this.config[key] ?? this.defaults[key];
    if (value === undefined) {
      throw new Error(`Unable to read value for ${key} from configuration.`);
    }
    return value;
  }
}

export default new BotConfig(process.env);