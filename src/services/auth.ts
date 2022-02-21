import fetch from 'node-fetch';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IDiscordOauth2 } from 'src/types/base';

@Injectable()
class authService {
  public async auth(code: string): Promise<IDiscordOauth2> {
    try {
      const response = await fetch('https://discordapp.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
          code,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: `http://localhost:3000/api/v1/auth/discord`,
          scope: 'identify guilds',
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const responseAsJson = await response.json();
      if (responseAsJson.error) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: responseAsJson.error,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return responseAsJson;
    } catch (err) {
      throw err;
    }
  }

  public async getUserData(cookie: IDiscordOauth2): Promise<any> {
    try {
      const response = await fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${cookie.token_type} ${cookie.access_token}`,
        },
      });
      return response.json();
    } catch (err) {
      throw err;
    }
  }
}
export default authService;
