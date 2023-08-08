/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodos } from 'src/todos/dtos/createtodo.dto';
import { Todo } from 'src/typeorm/entities/Todo';
 import { Repository } from 'typeorm';

//TypeORM Repository design pattern, each entity has its own Repository. 
//These repositories can be obtained from the database connection

@Injectable()//for injections
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}
//create todo funciton for cretiing the todo by using user id after authentication user can create it
  async createTodo(createtodos:CreateTodos): Promise<Todo> {
    const todo = this.todoRepository.create(createtodos);
    return this.todoRepository.save(todo);
  }
//check by todo id that this todo is completed 
  async markTodoAsCompleted(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    todo.completed = true;
    return this.todoRepository.save(todo);
  }
  //find all the todos created by specific user
  async getallTodosByUser(userId:number):Promise <Todo[]> {
 const todo= await this.todoRepository.find({where:{user:{id:userId}}})
 return todo;
  }
  //delete 
  async RemoveTodo(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return this.todoRepository.remove(todo);
  }

  //update the todo task 
  
  
  //get the completed Todos by specific User
// async completedTodosByUser(userId:number,id:number):Promise<Todo[]>{
//     const todo = await this.todoRepository.findOne({ where: { id } });
//     if (!todo) {
//       throw new NotFoundException('Todo not found');
//     }
//     todo.completed = true;
// }



}
