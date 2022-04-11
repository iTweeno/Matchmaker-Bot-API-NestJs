import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import AuthModule from "./modules/auth";
import ChannelsModule from "./modules/channels";
import GuildsModule from "./modules/guilds";
import TeamsModule from "./modules/teams";
import SolosLeaderboardModule from "./modules/solosLeaderboard";
import TeamsLeaderboardModule from "./modules/teamsLeaderboard";

@Module({
	imports: [
		MongooseModule.forRoot(
			process.env.NODE_ENV === "prod"
				? `mongodb:${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}//@${process.env.MONGO_HOST}:27017/matchmaker`
				: "mongodb://localhost:27017/matchmaker"
		),
		ConfigModule.forRoot({ envFilePath: ".env" }),
		AuthModule,
		ChannelsModule,
		GuildsModule,
		TeamsModule,
		SolosLeaderboardModule,
		TeamsLeaderboardModule,
	],
})
export default class AppModule {}
