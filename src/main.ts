import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { NextFunction } from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public', { prefix: '/static' });
  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('before', req.url);
    next();
    console.log('after');
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(process.env.PORT ?? 3000);

  //   setTimeout(() => {
  //     app.close();
  //   }, 1000);
}
bootstrap();
