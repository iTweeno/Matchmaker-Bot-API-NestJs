import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import SolosLeaderboardService from './services/solosLeaderboard';
import SolosLeaderboardController from './controllers/solosLeaderboard';
import ChannelsService from './services/channels';
import ChannelsController from './controllers/channels';
import TeamsService from './services/teams';
import TeamsController from './controllers/teams';
import TeamsLeaderboardService from './services/teamsLeaderboard';
import TeamsLeaderboardController from './controllers/teamsLeaderboard';
import {
  SolosLeaderboard,
  SolosLeaderboardSchema,
} from './schemas/solosLeaderboard';
import {
  TeamsLeaderboard,
  TeamsLeaderboardSchema,
} from './schemas/teamsLeaderboard';
import { Teams, TeamsSchema } from './schemas/teams';
import { Channels, ChannelsSchema } from './schemas/channels';
import LoginController from './controllers/auth';
import LoginService from './services/auth';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/matchmaker'),
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
  ],
  providers: [
    SolosLeaderboardService,
    TeamsService,
    ChannelsService,
    TeamsLeaderboardService,
    LoginService,
  ],
})
export default class AppModule {}
