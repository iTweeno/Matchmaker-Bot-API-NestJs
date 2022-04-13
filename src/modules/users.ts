import { Module } from "@nestjs/common";
import UsersController from "src/controllers/users";
import UsersService from "src/services/users";

@Module({
	controllers: [UsersController],
	providers: [UsersService],
})
export default class UsersModule {}
