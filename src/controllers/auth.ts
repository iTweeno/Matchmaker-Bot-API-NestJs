import { Controller, Get, Query, Res } from '@nestjs/common';
import AuthService from 'src/services/auth';
import { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
  private _authService: AuthService;

  constructor(AuthService: AuthService) {
    this._authService = AuthService;
  }

  @Get('discord')
  async login(
    @Res({ passthrough: true }) response: FastifyReply,
    @Query('code') oAuth2Token: string,
  ) {
    const tokenInfo = await this._authService.auth(oAuth2Token);

    response.setCookie('discordTokenInfo', JSON.stringify(tokenInfo), {
      expires: new Date(1000 * 60 * 10),
    });

    response.redirect('/');
  }
}

export default AuthController;
