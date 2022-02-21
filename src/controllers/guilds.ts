import {
  Controller,
  Get,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import GuildsService from 'src/services/guilds';
import { FastifyRequest } from 'fastify';
import { IDiscordOauth2 } from 'src/types/base';

@Controller('guilds')
export class GuildsController {
  private _guildsService: GuildsService;

  constructor(AuthService: GuildsService) {
    this._guildsService = AuthService;
  }

  @Get('getguildsuserandbotisin')
  async getGuildsUserAndBotIsIn(@Req() request: FastifyRequest) {
    console.log(decodeURIComponent(request.cookies.discordTokenInfo));
    const cookie = JSON.parse(
      decodeURIComponent(request.cookies.discordTokenInfo),
    ) as IDiscordOauth2;

    if (!cookie) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'User is not Logged in!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return await this._guildsService.getGuildsUserAndBotIsIn(cookie);
  }
}

export default GuildsController;
