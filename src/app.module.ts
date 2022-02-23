import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { MiddlewareConsumer, Module } from "@nestjs/common";

import TeamsLeaderboardService from "./services/teamsLeaderboard";
import TeamsService from "./services/teams";
import SolosLeaderboardService from "./services/solosLeaderboard";
import GuildsService from "./services/guilds";
import ChannelsService from "./services/channels";
import LoginService from "./services/auth";
import { TeamsLeaderboard, TeamsLeaderboardSchema } from "./schemas/teamsLeaderboard";
import { Teams, TeamsSchema } from "./schemas/teams";
import { SolosLeaderboard, SolosLeaderboardSchema } from "./schemas/solosLeaderboard";
import { Channels, ChannelsSchema } from "./schemas/channels";
import TeamsLeaderboardController from "./controllers/teamsLeaderboard";
import TeamsController from "./controllers/teams";
import SolosLeaderboardController from "./controllers/solosLeaderboard";
import GuildsController from "./controllers/guilds";
import ChannelsController from "./controllers/channels";
import LoginController from "./controllers/auth";
import DiscordTokenValidation from "./middleware/discordTokenValidation";

@Module({
	imports: [
		MongooseModule.forRoot("mongodb://localhost:27017/matchmaker"),
		MongooseModule.forFeature([
			{ name: SolosLeaderboard.name, schema: SolosLeaderboardSchema },
			{ name: TeamsLeaderboard.name, schema: TeamsLeaderboardSchema },
			{ name: Channels.name, schema: ChannelsSchema },
			{ name: Teams.name, schema: TeamsSchema },
		]),
		ConfigModule.forRoot(),
	],
	controllers: [
		SolosLeaderboardController,
		TeamsController,
		ChannelsController,
		TeamsLeaderboardController,
		LoginController,
		GuildsController,
	],
	providers: [
		SolosLeaderboardService,
		TeamsService,
		ChannelsService,
		TeamsLeaderboardService,
		LoginService,
		GuildsService,
	],
})
export default class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(DiscordTokenValidation).forRoutes(GuildsController);
	}
}
