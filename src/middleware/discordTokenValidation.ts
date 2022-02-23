import { Injectable, NestMiddleware, HttpStatus, HttpException } from "@nestjs/common";
import { FastifyRequest } from "fastify";

@Injectable()
class DiscordTokenValidation implements NestMiddleware {
	async use(req: FastifyRequest, res: Response, next: () => void) {
		console.log(req.cookies);
		if (!req.cookies.discordTokenInfo) {
			throw new HttpException(
				{
					status: HttpStatus.UNAUTHORIZED,
					error: "User is not Logged in!",
				},
				HttpStatus.UNAUTHORIZED
			);
		}
		next();
	}
}
export default DiscordTokenValidation;
