import { Global, Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// 将该模块标记为全局模块
@Global()
@Module({
  imports: [],
  controllers: [CatsController],
  providers: [CatsService], // 注入XXX服务
  exports: [CatsService], // 导出
})
export class CatsModule {
  // 模块类本身也可以 注入 提供者（例如用于配置目的）：
  //   constructor(private catsService: CatsService) {} //但由于循环依赖的存在，模块类本身不能作为提供者被注入。
}
