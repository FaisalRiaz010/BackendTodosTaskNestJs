/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';



@Module({
  imports: [
  TypeOrmModule.forFeature([User]),
],
   
  controllers: [UsersController],
  providers: [UsersService],
  
})
export class UsersModule {
  
}
