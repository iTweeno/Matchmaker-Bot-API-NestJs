import fetch from "node-fetch";
import { FastifyRequest } from "fastify";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { IDiscordBasicInformation } from "src/types/discord";

@Injectable()
class UsersService {
	public async getUser(req: FastifyRequest): Promise<IDiscordBasicInformation> {
		try {
			const discordTokenInfo = JSON.parse(req.cookies.discordTokenInfo);

			const response = await fetch("https://discord.com/api/users/@me", {
				headers: {
					authorization: `${discordTokenInfo.token_type} ${discordTokenInfo.access_token}`,
				},
			});

			if (response.status.toString().startsWith("4")) {
				throw new HttpException(response.statusText, response.status);
			}

			return (await response.json()) as IDiscordBasicInformation;
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
