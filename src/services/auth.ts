import fetch from "node-fetch";
import { FastifyReply, FastifyRequest } from "fastify";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { IDiscordOauth2 } from "src/types/discord";

@Injectable()
class AuthService {
	public async auth(code: string): Promise<IDiscordOauth2> {
		const response = await fetch("https://discordapp.com/api/oauth2/token", {
			method: "POST",
			body: new URLSearchParams({
				code,
				client_id: process.env.DISCORD_CLIENT_ID,
				client_secret: process.env.DISCORD_CLIENT_SECRET,
				grant_type: "authorization_code",
				redirect_uri: `https://${process.env.HOSTNAME}/auth`,
				scope: "identify guilds",
			}),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		if (/^(4|5)/.test(response.status.toString())) {
			throw new HttpException(response.statusText, response.status);
		}

		const responseAsJson: IDiscordOauth2 = await response.json();

		responseAsJson.expires_in = Date.now() + responseAsJson.expires_in;

		return responseAsJson;
	}

	async validateCookie(req: FastifyRequest, res: FastifyReply) {
		try {
			const discordTokenInfo = JSON.parse(req.cookies.discordTokenInfo);
			if (!discordTokenInfo) {
				throw new Error();
			}
			if (discordTokenInfo.expires_in < Date.now()) {
				const refreshResponse = await fetch("https://discordapp.com/api/oauth2/token", {
					method: "POST",
					body: new URLSearchParams({
						client_id: process.env.DISCORD_CLIENT_ID,
						client_secret: process.env.DISCORD_CLIENT_SECRET,
						grant_type: "refresh_token",
						refresh_token: discordTokenInfo.refresh_token,
					}),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				});

				if (/^(4|5)/.test(refreshResponse.status.toString())) {
					throw new HttpException(refreshResponse.statusText, refreshResponse.status);
				}

				const refreshResponseAsJson: IDiscordOauth2 = await refreshResponse.json();

				refreshResponseAsJson.expires_in = Date.now() + refreshResponseAsJson.expires_in;

				res.setCookie("discordTokenInfo", JSON.stringify(refreshResponseAsJson), {
					expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
					httpOnly: true,
					secure: true,
					sameSite: "none",
					path: "/",
				});
			}
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
export default AuthService;
