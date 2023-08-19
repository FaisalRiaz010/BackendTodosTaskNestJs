/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
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
    //just use for testing
      async findByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
      }
    //function to create the user
      async createUser(createuserdto:CreateUserDto): Promise<User> { 
        const user = this.userRepository.create(createuserdto );
        return this.userRepository.save(user);
      }

      //login user for all access 
      async loginuser(userId:number):Promise<User>{
      const user= this.userRepository.findOne({where:{id:userId}} );
      return user;
      }
      
    
    
    
    
    
    
      //login 
      async LoginTodo(id: number,password:string): Promise<User> {
       
       const login=await this.userRepository.findOne({ where: { id } && {password} });
         if(password=="abc123"){
          return login;
        }else{
          console.log("Wrong Password");
        }
      }
      //chat
      async findUsersWithPendingTodos(): Promise<User[]> {
        return this.userRepository.find({
          relations: ['todos'],
          where: {
            username: Not(null),
          },
          join: {
            alias: 'user',
            leftJoinAndSelect: {
              todo: 'user.todos',
            },
          },
          select: ['id', 'username'],
          // Add your criteria for fetching users with pending todos
          // For example: { todo: { completed: false } }
        });
      }
}
