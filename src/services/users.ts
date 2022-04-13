import fetch from "node-fetch";
import { FastifyRequest } from "fastify";
import { Injectable } from "@nestjs/common";

import { IDiscordBasicInformation } from "src/types/discord";

@Injectable()
class UsersService {
	public async getUser(req: FastifyRequest): Promise<IDiscordBasicInformation> {
		const discordTokenInfo = JSON.parse(req.cookies.discordTokenInfo);

		const response = await fetch("https://discord.com/api/users/@me", {
			headers: {
				authorization: `${discordTokenInfo.token_type} ${discordTokenInfo.access_token}`,
			},
		});
		return (await response.json()) as IDiscordBasicInformation;
	}
}
export default UsersService;
