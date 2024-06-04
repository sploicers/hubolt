import { ClientOptions, Message, } from 'discord.js';
export type DiscordMessage = Message;
export type DiscordClientOptions = ClientOptions & { token: string };