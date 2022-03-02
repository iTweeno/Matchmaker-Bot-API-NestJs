import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import SolosLeaderboardController from "../controllers/solosLeaderboard";
import SolosLeaderboardService from "../services/solosLeaderboard";
import { SolosLeaderboard, SolosLeaderboardSchema } from "../schemas/solosLeaderboard";

@Module({
	imports: [MongooseModule.forFeature([{ name: SolosLeaderboard.name, schema: SolosLeaderboardSchema }])],
	controllers: [SolosLeaderboardController],
	providers: [SolosLeaderboardService],
})
export default class SolosLeaderboardModule {}
