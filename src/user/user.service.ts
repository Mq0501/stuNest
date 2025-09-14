import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private manager: EntityManager;

  // 直接用EntityManager的缺点是每个api都要带上对应的Entity，先getRepository(User)拿到user对应的Repository，再getRepository(User).find()
  @InjectRepository(User)
  private userRepository: Repository<User>;

  create(createUserDto: CreateUserDto) {
    this.manager.getRepository(User).save(createUserDto);
  }

  findAll() {
    // return this.manager.find(User);
    return this.userRepository.find();
  }

  findOne(id: number) {
    // return this.manager.findOne(User, {
    //   where: { id },
    // });
    return this.userRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // this.manager.save(User, {
    //   id: id,
    //   ...updateUserDto,
    // });
    this.userRepository.save({
      id: id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    // this.manager.delete(User, id);
    this.userRepository.delete(id);
  }
}
