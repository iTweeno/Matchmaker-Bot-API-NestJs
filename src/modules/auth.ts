import { Module } from "@nestjs/common";
import AuthController from "../controllers/auth";
import AuthService from "../services/auth";

@Module({
	controllers: [AuthController],
	providers: [AuthService],
})
export default class AuthModule {}
