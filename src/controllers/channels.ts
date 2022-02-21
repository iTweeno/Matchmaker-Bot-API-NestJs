import { Controller, Get, Param, Patch, Body } from "@nestjs/common";

import ChannelsService from "../services/channels";

@Controller()
export class ChannelsController {
	private _channelsService: ChannelsService;

	constructor(channelsService: ChannelsService) {
		this._channelsService = channelsService;
	}

	@Get("channel/:channelId")
	async getChannel(@Param("channelId") channelId: string) {
		return await this._channelsService.getChannelByChannelId(channelId);
	}

	@Get("channels/:guildId")
	async getChannelsByGuildId(@Param("guildId") guildId: string) {
		return await this._channelsService.getChannelsByGuildId(guildId);
	}

	@Patch("channel/:channelId")
	async editChannel(@Param("channelId") channelId: string, @Body() body) {
		return await this._channelsService.editChannel(channelId, body);
	}
}

export default ChannelsController;
