import { FastifyRequest } from "fastify";
import { Controller, Get, Req } from "@nestjs/common";
import GuildsService from "src/services/guilds";

@Controller("guilds")
export class GuildsController {
	private _guildsService: GuildsService;

	constructor(AuthService: GuildsService) {
		this._guildsService = AuthService;
	}

	@Get("getguildsuserandbotisin")
	async getGuildsUserAndBotIsIn(@Req() req: FastifyRequest) {
		return await this._guildsService.getGuildsUserAndBotIsIn(req);
	}
}

export default GuildsController;
