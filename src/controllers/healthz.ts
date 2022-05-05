import { FastifyReply } from "fastify";
import { Controller, Get, Res } from "@nestjs/common";

@Controller("")
export class HealthzController {
	@Get("healthz")
	async login(@Res({ passthrough: true }) res: FastifyReply) {
		res.status(200).send();
	}
}

export default HealthzController;
