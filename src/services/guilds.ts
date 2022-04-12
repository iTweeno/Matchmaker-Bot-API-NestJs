import fetch from "node-fetch";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { Channels, ChannelsDocument } from "../schemas/channels";

import { IGuilds } from "src/types/base";
import { IDiscordOauth2 } from "src/types/discord";

@Injectable()
class GuildsService {
	constructor(
		@InjectModel(Channels.name)
		private readonly channelsModel: Model<ChannelsDocument>
	) {}

	public async getGuildsUserAndBotIsIn(cookie: IDiscordOauth2): Promise<IGuilds[]> {
		const tokenData = await fetch("https://discord.com/api/users/@me/guilds", {
			headers: {
				authorization: `${cookie.token_type} ${cookie.access_token}`,
			},
		});
		const tokenDataAsJson = (await tokenData.json()) as any;

		if (tokenDataAsJson.message) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: "Cookie is invalid!",
				},
				HttpStatus.UNAUTHORIZED
			);
		}

		const serversInCommonWithDb = await this.channelsModel.find({
			$or: tokenDataAsJson.map((e) => ({ guildId: e.id })),
		});

		const a = tokenDataAsJson.filter((e) => serversInCommonWithDb.find((f) => f.guildId === e.id));

		return a.map((e) => ({
			id: e.id,
			name: e.name,
			icon: e.icon,
		})) as IGuilds[];
	}
}
export default GuildsService;
