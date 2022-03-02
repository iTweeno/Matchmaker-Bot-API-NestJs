import { FastifyReply, FastifyRequest } from "fastify";
import { Injectable, NestMiddleware, HttpStatus, HttpException } from "@nestjs/common";
import fetch from "node-fetch";

@Injectable()
class DiscordTokenValidation implements NestMiddleware {
	async use(req: FastifyRequest, res: FastifyReply, next: () => void) {
		let err = false;
		try {
			const discordTokenInfo = JSON.parse(req.cookies.discordTokenInfo);
			if (!discordTokenInfo) {
				err = true;
			}
			if (discordTokenInfo.expires_in === 0) {
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
				res.setCookie("discordTokenInfo", JSON.stringify(await refreshResponse.json()));
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
			next();
		}
	}
}
export default DiscordTokenValidation;
