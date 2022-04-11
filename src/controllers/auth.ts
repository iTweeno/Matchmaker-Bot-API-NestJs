import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, Get, Query, Req, Res } from "@nestjs/common";

import AuthService from "src/services/auth";

@Controller("auth")
export class AuthController {
	private _authService: AuthService;

	constructor(AuthService: AuthService) {
		this._authService = AuthService;
	}

	@Get("discord")
	async login(@Res({ passthrough: true }) res: FastifyReply, @Query("code") oAuth2Token: string) {
		const tokenInfo = await this._authService.auth(oAuth2Token);

		res.setCookie("discordTokenInfo", JSON.stringify(tokenInfo), {
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
			httpOnly: true,
			secure: true,
			sameSite: "none",
			path: "/",
		});

		res.status(200);
	}

	@Get("validatecookie")
	async validateCookie(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
		return this._authService.validateCookie(req, res);
	}
}

export default AuthController;
