import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CatsModule } from './cat/cats.module';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })

@Module({
  imports: [CatsModule],
})
export class AppModule {}
