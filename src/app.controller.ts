import {
  Controller,
  Get,
  Inject,
  OnApplicationBootstrap,
  OnModuleInit,
  BeforeApplicationShutdown,
  UseGuards,
  Render,
  SetMetadata,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { AaaGuard } from './aaa.guard';

@Controller()
export class AppController
  implements OnModuleInit, OnApplicationBootstrap, BeforeApplicationShutdown
{
  constructor(
    private readonly appService: AppService,
    @Inject('person') private readonly person: { name: string; age: number },
  ) {}

  onModuleInit() {
    console.log('onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('onApplicationBootstrap');
  }

  beforeApplicationShutdown(signal: string) {
    console.log('beforeApplicationBootstrap', signal);
  }

  @Get()
  @SetMetadata('aaa', 'admin')
  @UseGuards(AaaGuard)
  getHello(): string {
    console.log(this.person);
    return this.appService.getHello();
  }

  @Get('aaa')
  @UseGuards(LoginGuard)
  aaa(): string {
    return this.appService.aaa();
  }

  @Get('user')
  @Render('user')
  user() {
    return {
      name: '张三',
      age: 18,
    };
  }
}
