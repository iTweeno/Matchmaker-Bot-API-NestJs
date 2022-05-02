import { Controller, Get, Param } from "@nestjs/common";

import ChannelsService from "../services/channels";

@Controller("channels")
export class ChannelsController {
	private _channelsService: ChannelsService;

	constructor(channelsService: ChannelsService) {
		this._channelsService = channelsService;
	}

	@Get("/:channelId")
	async getChannelById(@Param("channelId") channelId: string) {
		return await this._channelsService.getChannelById(channelId);
	}

	@Get("guild/:guildId")
	async getChannelByGuildId(@Param("guildId") channelId: string) {
		return await this._channelsService.getChannelsByGuildId(channelId);
	}
}

export default ChannelsController;
