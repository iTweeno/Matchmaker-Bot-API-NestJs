import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import TeamsLeaderboardController from "../controllers/teamsLeaderboard";
import TeamsLeaderboardService from "../services/teamsLeaderboard";
import { TeamsLeaderboard, TeamsLeaderboardSchema } from "../schemas/teamsLeaderboard";

@Module({
	imports: [MongooseModule.forFeature([{ name: TeamsLeaderboard.name, schema: TeamsLeaderboardSchema }])],
	controllers: [TeamsLeaderboardController],
	providers: [TeamsLeaderboardService],
})
export default class TeamsLeaderboardModule {}
