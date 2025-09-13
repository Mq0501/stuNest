import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
// import { CatsModule } from './cat/cats.module';
import { PersonModule } from './person/person.module';

@Module({
  //   imports: [ConfigModule.register({ folder: './config' }), PersonModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'person',
      useValue: {
        name: '张三',
        age: 18,
      },
    },
  ],
})

// @Module({
//   imports: [CatsModule],
// })
export class AppModule {}
