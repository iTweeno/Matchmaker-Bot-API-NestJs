import fetch from "node-fetch";
import { FastifyRequest } from "fastify";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { IDiscordUser } from "src/types/discord";

@Injectable()
class UsersService {
	public async getUser(req: FastifyRequest): Promise<IDiscordUser> {
		try {
			const discordTokenInfo = JSON.parse(req.cookies.discordTokenInfo);

			const response = await fetch("https://discord.com/api/users/@me", {
				headers: {
					authorization: `${discordTokenInfo.token_type} ${discordTokenInfo.access_token}`,
				},
			});

			if (/^(4|5)/.test(response.status.toString())) {
				throw new HttpException(response.statusText, response.status);
			}

			const user: IDiscordUser = await response.json();

			return user;
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
export default UsersService;
