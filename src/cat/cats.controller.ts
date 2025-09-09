import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

// controller是处理路由和解析请求参数的
@Controller('cats')
export class CatsController {
  // 在构造函数中直接声明
  constructor(private catsService: CatsService) {}

  // 声明一个/cats/get接口
  @Get('list')
  findAll(): Cat[] {
    return this.catsService.findAll();
  }
}
