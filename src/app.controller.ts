import {
  Controller,
  Get,
  UseGuards,
  Render,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Query,
  Inject,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';

@Controller()
export class AppController {
  //   private logger = new Logger();

  @Inject(WINSTON_LOGGER_TOKEN)
  private logger;

  constructor(private readonly appService: AppService) {}

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
  //   @SetMetadata('aaa', 'admin')
  //   @UseGuards(AaaGuard)
  getHello(): string {
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
    // this.logger.debug('aaa', AppController.name);
    this.logger.error('bbb', AppController.name);
    this.logger.log('ccc', AppController.name);
    // this.logger.verbose('ddd', AppController.name);
    this.logger.warn('eee', AppController.name);
    return {
      name: '张三',
      age: 18,
    };
  }
}
