/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
//typeORM Repository
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //function to create the user
  async createUser(createuserdto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createuserdto);
    return this.userRepository.save(user);
  }

  //update user password

  async updateUser(id: number, updatePassword: string): Promise<User> {
    const existuser = await this.userRepository.findOne({ where: { id } });
    console.log(existuser);
    if (!existuser) {
      throw new NotFoundException('user not FOund');
    }
    existuser.password = updatePassword;
    console.log(updatePassword);
    const updateUser = await this.userRepository.save(existuser);
    return updateUser;
  }
}
