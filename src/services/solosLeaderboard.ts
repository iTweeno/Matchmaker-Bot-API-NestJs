import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  SolosLeaderboard,
  SolosLeaderboardDocument,
} from '../schemas/solosLeaderboard';

@Injectable()
class SolosLeaderboardService {
  private logger = new Logger(SolosLeaderboardService.name);

  constructor(
    @InjectModel(SolosLeaderboard.name)
    private readonly solosLeaderboardModel: Model<SolosLeaderboardDocument>,
  ) {}

  public async getSolosLeaderboardByChannelId(
    channelId: string,
    skip: number,
  ): Promise<SolosLeaderboardDocument[]> {
    try {
      this.logger.log(`getSolosLeaderboardByChannelId: ${channelId}`);
      return await this.solosLeaderboardModel
        .find({ channelId })
        .skip(skip ?? 0)
        .limit(10);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  public async getSolosLeaderboardsByGuildId(
    guildId: string,
    skip: number,
  ): Promise<SolosLeaderboardDocument[]> {
    try {
      this.logger.log(
        `getSolosLeaderboardsByGuildId: ${guildId}, ${this.solosLeaderboardModel.collection.name}`,
      );
      return await this.solosLeaderboardModel
        .find({ guildId })
        .skip(skip ?? 0)
        .limit(10);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
export default SolosLeaderboardService;
