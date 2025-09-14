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
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { AaaGuard } from './aaa.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@Controller()
export class AppController
  implements OnModuleInit, OnApplicationBootstrap, BeforeApplicationShutdown
{
  constructor(
    private readonly appService: AppService,
    @Inject('person') private readonly person: { name: string; age: number },
  ) {}
  beforeApplicationShutdown(signal?: string) {
    console.log('Method not implemented.');
  }
  onApplicationBootstrap() {
    console.log('Method not implemented.');
  }
  onModuleInit() {
    console.log('AppController has been initialized.');
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      dest: 'uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: { name: string },
  ) {
    console.log('body', body);
    console.log('files', files);

    const matchResult = body.name.match(/(.+)-\d+$/);
    if (!matchResult) {
      throw new Error('Invalid file name format');
    }
    const fileName = matchResult[1];
    const chunkDir = 'uploads/chunks_' + fileName;

    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir);
    }
    fs.cpSync(files[0].path, chunkDir + '/' + body.name);
    fs.rmSync(files[0].path);
  }

  @Get('merge')
  merge(@Query('name') name: string) {
    const chunkDir = 'uploads/chunks_' + name;

    const files = fs.readdirSync(chunkDir);

    let count = 0;
    let startPos = 0;
    files.map((file) => {
      const filePath = chunkDir + '/' + file;
      const stream = fs.createReadStream(filePath);
      stream
        .pipe(
          fs.createWriteStream('uploads/' + name, {
            start: startPos,
          }),
        )
        .on('finish', () => {
          count++;

          if (count === files.length) {
            fs.rm(
              chunkDir,
              {
                recursive: true,
              },
              () => {},
            );
          }
        });

      startPos += fs.statSync(filePath).size;
    });
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
