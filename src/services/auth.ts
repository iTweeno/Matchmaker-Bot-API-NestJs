import fetch from "node-fetch";
import { FastifyReply, FastifyRequest } from "fastify";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { IDiscordBasicInformation, IDiscordOauth2 } from "src/types/discord";

@Injectable()
class authService {
	public async auth(code: string): Promise<IDiscordOauth2> {
		const response = await fetch("https://discordapp.com/api/oauth2/token", {
			method: "POST",
			body: new URLSearchParams({
				code,
				client_id: process.env.CLIENT_ID,
				client_secret: process.env.CLIENT_SECRET,
				grant_type: "authorization_code",
				redirect_uri: `https://localhost:3000/auth`,
				scope: "identify guilds",
			}),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		if (response.status === 400) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: response.statusText,
				},
				HttpStatus.BAD_REQUEST
			);
		}

		const responseAsJson: IDiscordOauth2 = await response.json();

		responseAsJson.expires_in = Date.now() + responseAsJson.expires_in;

		return responseAsJson;
	}

	public async getUserData(cookie: IDiscordOauth2): Promise<IDiscordBasicInformation> {
		const response = await fetch("https://discord.com/api/users/@me", {
			headers: {
				authorization: `${cookie.token_type} ${cookie.access_token}`,
			},
		});
		return (await response.json()) as IDiscordBasicInformation;
	}

	async validateCookie(req: FastifyRequest, res: FastifyReply) {
		let err = false;
		try {
			const discordTokenInfo = JSON.parse(req.cookies.discordTokenInfo);
			if (!discordTokenInfo) {
				err = true;
			}
			if (discordTokenInfo.expires_in < Date.now()) {
				const refreshResponse = await fetch("https://discordapp.com/api/oauth2/token", {
					method: "POST",
					body: new URLSearchParams({
						client_id: process.env.CLIENT_ID,
						client_secret: process.env.CLIENT_SECRET,
						grant_type: "refresh_token",
						refresh_token: discordTokenInfo.refresh_token,
					}),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				});

				const refreshResponseAsJson: IDiscordOauth2 = await refreshResponse.json();

				refreshResponseAsJson.expires_in = Date.now() + refreshResponseAsJson.expires_in;

				res.setCookie("discordTokenInfo", JSON.stringify(await refreshResponse.json()), {
					expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
					httpOnly: true,
					secure: true,
					sameSite: "none",
					path: "/",
				});
			}
		} catch (e) {
			err = true;
		} finally {
			if (err) {
				throw new HttpException(
					{
						status: HttpStatus.BAD_REQUEST,
						error: "Cookie is invalid!",
					},
					HttpStatus.UNAUTHORIZED
				);
			}
		}
		return res.status(200).send();
	}
}
export default authService;
