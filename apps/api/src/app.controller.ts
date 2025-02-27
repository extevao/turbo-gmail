import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('auth-url')
  authUrl() {
    return this.appService.authUrl();
  }

  @Get('redirect-login')
  redirectLogin(@Query() params: { code: string; scope: string }) {
    return this.appService.redirectLogin(params);
  }

  @Get()
  sendEmail() {
    return { ok: true, data: new Date() };
    // return this.appService.sendEmail();
  }
}
