import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

// 业务逻辑的具体实现，比如操作数据库等等

// 服务中必须要使用Injectable装饰器，声明此服务可以被注入
@Injectable()
export class CatsService {
  // readonly:Ts修饰符，表示这个属性只能在声明时或者构造函数中赋值，之后不能被修改
  private readonly cats: Cat[] = [{ name: 'marry', age: 5, breed: '1' }];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
