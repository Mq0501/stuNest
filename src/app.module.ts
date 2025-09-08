import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CatsController } from './try/cats.controller';
import { CatsService } from './try/cats.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [CatsService], // 注入XXX服务
})
export class AppModule {}
