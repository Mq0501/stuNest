import { Get, Injectable, UseGuards } from '@nestjs/common';
import { LoginGuard } from './login.guard';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @Get('aaa')
  aaa(): string {
    return 'aaa';
  }
}
