import { FastifyRequest } from "fastify";
import { Controller, Get, Req } from "@nestjs/common";

import UserService from "src/services/users";

@Controller("users")
export class UsersController {
	private _userService: UserService;

	constructor(UserService: UserService) {
		this._userService = UserService;
	}

	@Get("getuserdata")
	async login(@Req() req: FastifyRequest) {
		return await this._userService.getUser(req);
	}
}

export default UsersController;
