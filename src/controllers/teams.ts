import { Controller, Get, Param } from '@nestjs/common';

import TeamsService from '../services/teams';

@Controller()
export class TeamsController {
  private _teamsService: TeamsService;

  constructor(teamsService: TeamsService) {
    this._teamsService = teamsService;
  }

  @Get('teams/:guildId')
  async getChannel(@Param('channelId') channelId: string) {
    return await this._teamsService.getTeamsByGuildId(channelId);
  }
}

export default TeamsController;
