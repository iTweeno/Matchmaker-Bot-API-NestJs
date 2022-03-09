import { MongooseModule } from "@nestjs/mongoose";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import AuthModule from "./modules/auth";
import ChannelsModule from "./modules/channels";
import GuildsModule from "./modules/guilds";
import TeamsModule from "./modules/teams";
import SolosLeaderboardModule from "./modules/solosLeaderboard";
import TeamsLeaderboardModule from "./modules/teamsLeaderboard";

import DiscordTokenValidation from "./middleware/discordTokenValidation";

@Module({
	imports: [
		MongooseModule.forRoot(
			process.env.NODE_ENV === "prod"
				? `mongodb:${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}//@${process.env.MONGO_HOST}:27017/matchmaker`
				: "mongodb://localhost:27017/matchmaker"
		),
		AuthModule,
		ChannelsModule,
		GuildsModule,
		TeamsModule,
		SolosLeaderboardModule,
		TeamsLeaderboardModule,
	],
})
export default class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(DiscordTokenValidation).forRoutes("/v(.*)/guilds");
	}
}
