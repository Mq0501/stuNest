import { Get, Injectable } from '@nestjs/common';

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
