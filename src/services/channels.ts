import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Channels, ChannelsDocument } from '../schemas/channels';
import { IUpdateResult, UpdateOptions } from '../types/base';

@Injectable()
class channelsService {
  private logger = new Logger(channelsService.name);

  constructor(
    @InjectModel(Channels.name)
    private readonly channelsModel: Model<ChannelsDocument>,
  ) {}

  public async getChannelByChannelId(
    channelId: string,
  ): Promise<ChannelsDocument> {
    try {
      this.logger.log(`getChannel: ${channelId}`);
      return await this.channelsModel.findOne({ channelId });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  public async getChannelsByGuildId(
    guildId: string,
  ): Promise<ChannelsDocument[]> {
    try {
      this.logger.log(`getChannelsByGuildId: ${guildId}`);
      return await this.channelsModel.find({ guildId });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
  public async getChannelsByGuildIds(
    guildIds: string[],
  ): Promise<ChannelsDocument[]> {
    try {
      this.logger.log(`getChannelsByGuildId: ${guildIds}`);
      return await this.channelsModel.find({
        $or: [guildIds.map((e) => ({ guildId: e }))],
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  public async editChannel(
    channelId: string,
    body: UpdateOptions<Channels>,
  ): Promise<IUpdateResult> {
    try {
      this.logger.log(`editChannel: ${channelId}, ${JSON.stringify(body)}`);
      return await this.channelsModel.updateOne({ channelId }, body);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
export default channelsService;
