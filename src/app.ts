import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import AuthModule from "./modules/auth";
import ChannelsModule from "./modules/channels";
import GuildsModule from "./modules/guilds";
import SolosLeaderboardModule from "./modules/solosLeaderboard";
import TeamsLeaderboardModule from "./modules/teamsLeaderboard";
import UsersModule from "./modules/users";
import HealthzModule from "./modules/healthz";

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: ".env" }),
		MongooseModule.forRoot(
			`mongodb://${
				process.env.NODE_ENV === "prod" ? `${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@` : ""
			}${process.env.MONGO_HOST}:27017/matchmaker`
		),
		AuthModule,
		ChannelsModule,
		GuildsModule,
		SolosLeaderboardModule,
		TeamsLeaderboardModule,
		UsersModule,
		HealthzModule,
	],
})
export default class AppModule {}
