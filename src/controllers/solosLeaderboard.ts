import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import SolosLeaderboardService from '../services/solosLeaderboard';

@Controller('leaderboards/solos')
export class SolosLeaderboardController {
  private _solosLeaderboardService: SolosLeaderboardService;

  constructor(solosLeaderboardService: SolosLeaderboardService) {
    this._solosLeaderboardService = solosLeaderboardService;
  }

  @Get('/channel/:channelId')
  async getSolosLeaderboardByChannelId(
    @Param('channelId') channelId: string,
    @Query('skip', ParseIntPipe) skip: number,
  ) {
    return await this._solosLeaderboardService.getSolosLeaderboardByChannelId(
      channelId,
      skip,
    );
  }

  @Get('/guild/:guildId')
  async getSolosLeaderboardsByGuildId(
    @Param('guildId') guildId: string,
    @Query('skip', ParseIntPipe) skip: number,
  ) {
    return await this._solosLeaderboardService.getSolosLeaderboardsByGuildId(
      guildId,
      skip,
    );
  }
}

export default SolosLeaderboardController;
