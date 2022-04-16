import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";
import fetch from "node-fetch";
import { APIChannel } from "discord-api-types/v8";

import { IUpdateResult, UpdateOptions } from "../types/base";
import { Channels, ChannelsDocument } from "../schemas/channels";

@Injectable()
class channelsService {
	private logger = new Logger(channelsService.name);

	constructor(
		@InjectModel(Channels.name)
		private readonly channelsModel: Model<ChannelsDocument>
	) {}

	public async getChannelById(channelId: string): Promise<ChannelsDocument> {
		this.logger.log(`getChannel: ${channelId}`);

		return await this.channelsModel.findOne({ channelId });
	}

	public async getChannelsByGuildId(guildId: string): Promise<Channels[]> {
		this.logger.log(`getChannelsByGuildId: ${guildId}`);

		const discordChannels = await fetch(`https://discordapp.com/api/v8/guilds/${guildId}/channels`, {
			headers: {
				Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
			},
		});

		const discordChannelsJson = (await discordChannels.json()) as APIChannel[];

		const channelsInDb: any = await this.channelsModel.find({
			// Any because the document shows metadata, and the ChannelsDocument isnt expecting that
			channelId: { $in: discordChannelsJson.map((e) => e.id) },
		});

		return channelsInDb.map((e) => {
			return {
				...e._doc,
				name: discordChannelsJson.find((c) => c.id === e.channelId)?.name,
			};
		});
	}

	public async getChannelsByGuildIds(guildIds: string[]): Promise<ChannelsDocument[]> {
		this.logger.log(`getChannelsByGuildId: ${guildIds}`);

		return await this.channelsModel.find({
			$or: [guildIds.map((e) => ({ guildId: e }))],
		});
	}

	public async editChannel(channelId: string, body: UpdateOptions<Channels>): Promise<IUpdateResult> {
		this.logger.log(`editChannel: ${channelId}, ${JSON.stringify(body)}`);

		return await this.channelsModel.updateOne({ channelId }, body);
	}
}
export default channelsService;
