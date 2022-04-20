import fetch from "node-fetch";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FastifyRequest } from "fastify";

import { Channels, ChannelsDocument } from "../schemas/channels";
import { IGuilds } from "src/types/base";
import { IDiscordOauth2 } from "src/types/discord";

@Injectable()
class GuildsService {
	constructor(
		@InjectModel(Channels.name)
		private readonly channelsModel: Model<ChannelsDocument>
	) {}

	public async getGuildsUserAndBotIsIn(req: FastifyRequest): Promise<IGuilds[]> {
		try {
			const cookie: IDiscordOauth2 = JSON.parse(req.cookies.discordTokenInfo);

			const tokenDataResponse = await fetch("https://discord.com/api/users/@me/guilds", {
				headers: {
					authorization: `${cookie.token_type} ${cookie.access_token}`,
				},
			});

			if (tokenDataResponse.status.toString().startsWith("4")) {
				throw new HttpException(tokenDataResponse.statusText, tokenDataResponse.status);
			}

			const tokenDataAsJson = await tokenDataResponse.json();

			const serversInCommonWithDb = await this.channelsModel.find({
				$or: tokenDataAsJson.map((guild) => ({ guildId: guild.id })),
			});

			const filteredGuilds = tokenDataAsJson.filter((guild) =>
				serversInCommonWithDb.find((f) => f.guildId === guild.id)
			);

			return filteredGuilds.map((guild) => ({
				id: guild.id,
				name: guild.name,
				icon: guild.icon,
			})) as IGuilds[];
		} catch (e) {
			throw new HttpException(
				{
					status: HttpStatus.UNAUTHORIZED,
					error: "Cookie is invalid!",
				},
				HttpStatus.UNAUTHORIZED
			);
		}
	}
}
export default GuildsService;
