import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';

@Injectable()
class authService {
  public async auth(code: string): Promise<string> {
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
      console.log(await response.json());
      return 'a';
    } catch (err) {
      throw err;
    }
  }
}
export default authService;
