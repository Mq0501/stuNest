import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { CONFIG_OPTIONS } from './constants';
import * as interfaces from './interfaces';

@Injectable()
export class ConfigService {
  private readonly envConfig: interfaces.EnvConfig;

  //   constructor(@Inject(CONFIG_OPTIONS) options: interfaces.ConfigOptions) {
  //     const filePath = `${process.env.NODE_ENV || 'development'}.env`;
  //     const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
  //     this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  //   }

  get(key: string): string {
    return this.envConfig[key];
  }
}
