import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Teams, TeamsDocument } from '../schemas/teams';

@Injectable()
class TeamsService {
  constructor(
    @InjectModel(Teams.name)
    private readonly TeamsModel: Model<TeamsDocument>,
  ) {}

  public async getTeamsByGuildId(channelId: string): Promise<TeamsDocument[]> {
    try {
      return await this.TeamsModel.find({ channelId });
    } catch (err) {
      throw err;
    }
  }
}
export default TeamsService;
