import { FastifyRequest } from "fastify";
import { Controller, Get, Req } from "@nestjs/common";
import { IDiscordOauth2 } from "src/types/discord";
import GuildsService from "src/services/guilds";

@Controller("guilds")
export class GuildsController {
	private _guildsService: GuildsService;

	constructor(AuthService: GuildsService) {
		this._guildsService = AuthService;
	}

	@Get("getguildsuserandbotisin")
	async getGuildsUserAndBotIsIn(@Req() request: FastifyRequest) {
		const cookie: IDiscordOauth2 = JSON.parse(decodeURIComponent(request.cookies.discordTokenInfo));

		return await this._guildsService.getGuildsUserAndBotIsIn(cookie);
	}
}

export default GuildsController;
