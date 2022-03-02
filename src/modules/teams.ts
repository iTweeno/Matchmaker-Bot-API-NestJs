import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import TeamsController from "../controllers/teams";
import TeamsService from "../services/teams";
import { Teams, TeamsSchema } from "../schemas/teams";

@Module({
	imports: [MongooseModule.forFeature([{ name: Teams.name, schema: TeamsSchema }])],
	controllers: [TeamsController],
	providers: [TeamsService],
})
export default class TeamsModule {}
