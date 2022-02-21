import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDiscordOauth2, IGuilds } from 'src/types/base';
import { Channels, ChannelsDocument } from '../schemas/channels';

@Injectable()
class GuildsService {
  constructor(
    @InjectModel(Channels.name)
    private readonly channelsModel: Model<ChannelsDocument>,
  ) {}
  public async getGuildsUserAndBotIsIn(
    cookie: IDiscordOauth2,
  ): Promise<IGuilds[]> {
    try {
      const tokenData = await fetch(
        'https://discord.com/api/users/@me/guilds',
        {
          headers: {
            authorization: `${cookie.token_type} ${cookie.access_token}`,
          },
        },
      );
      const tokenDataAsJson = await tokenData.json();

      const serversInCommonWithDb = await this.channelsModel.find({
        $or: tokenDataAsJson.map((e) => ({ guildId: e.id })),
      });

      const a = tokenDataAsJson.filter((e) =>
        serversInCommonWithDb.find((f) => f.guildId === e.id),
      );

      return a.map((e) => ({
        id: e.id,
        name: e.name,
        icon: e.icon,
      })) as IGuilds[];
    } catch (err) {
      throw err;
    }
  }
}
export default GuildsService;
