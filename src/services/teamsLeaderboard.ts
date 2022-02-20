import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  TeamsLeaderboard,
  TeamsLeaderboardDocument,
} from '../schemas/teamsLeaderboard';

@Injectable()
class TeamsLeaderboardService {
  constructor(
    @InjectModel(TeamsLeaderboard.name)
    private readonly TeamsLeaderboardModel: Model<TeamsLeaderboardDocument>,
  ) {}

  public async getTeamsLeaderboardByChannelId(
    channelId: string,
    skip: number,
  ): Promise<TeamsLeaderboardDocument[]> {
    try {
      return await this.TeamsLeaderboardModel.find({ channelId })
        .skip(skip ?? 0)
        .limit(10);
    } catch (err) {
      throw err;
    }
  }

  public async getTeamsLeaderboardByGuildId(
    guildId: string,
    skip: number,
  ): Promise<TeamsLeaderboardDocument[]> {
    try {
      return await this.TeamsLeaderboardModel.find({ guildId })
        .skip(skip ?? 0)
        .limit(10);
    } catch (err) {
      throw err;
    }
  }
}
export default TeamsLeaderboardService;
