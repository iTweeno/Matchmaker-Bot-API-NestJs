import { Controller, Get, Query } from '@nestjs/common';
import AuthService from 'src/services/auth';

@Controller('auth')
export class AuthController {
  private _authService: AuthService;

  constructor(AuthService: AuthService) {
    this._authService = AuthService;
  }

  @Get('discord')
  async login(@Query('code') oAuth2Token: string) {
    const response = await this._authService.auth(oAuth2Token);
    console.log(response);
    return response;
  }
}

export default AuthController;
