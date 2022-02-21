import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";

import { IUpdateResult, UpdateOptions } from "../types/base";
import { Channels, ChannelsDocument } from "../schemas/channels";

@Injectable()
class channelsService {
	private logger = new Logger(channelsService.name);

	constructor(
		@InjectModel(Channels.name)
		private readonly channelsModel: Model<ChannelsDocument>
	) {}

	public async getChannelByChannelId(channelId: string): Promise<ChannelsDocument> {
		this.logger.log(`getChannel: ${channelId}`);
		return await this.channelsModel.findOne({ channelId });
	}

	public async getChannelsByGuildId(guildId: string): Promise<ChannelsDocument[]> {
		this.logger.log(`getChannelsByGuildId: ${guildId}`);
		return await this.channelsModel.find({ guildId });
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
