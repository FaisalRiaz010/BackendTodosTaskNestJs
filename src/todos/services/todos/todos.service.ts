/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodos } from 'src/todos/dtos/createtodo.dto';
import { Todo } from 'src/typeorm/entities/Todo';
 import {  Repository } from 'typeorm';


//TypeORM Repository design pattern, each entity has its own Repository. 
//These repositories can be obtained from the database connection

@Injectable()//for injections
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}
//create todo funciton for cretiing the todo by using user id after authentication user can create it
async createTodo(userId: number, createtodo: CreateTodos): Promise<Todo> {
  const todo = this.todoRepository.create({ user: { id: userId }, ...createtodo });
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
  
//update
async updateTodo(id:number,title:string):Promise<Todo>{
  const existtodo=await this.todoRepository.findOne({ where: { id } });
  console.log(existtodo);
  if(!existtodo)
{
  throw new NotFoundException('todo not FOund');

}

existtodo.title=title;
console.log(title);
const updatetodo=await this.todoRepository.save(existtodo);
return updatetodo;

}
  
  
  //get the completed Todos by specific User
async completedTodosByUser(userId:number):Promise <Todo[]> {
  {
    const todos = await this.todoRepository.find({
      where: {
        user: { id: userId },
        completed: true,
      },
    });
    return todos;
  }
  
}




 //findthe pending tasks by users
 async getallPendTodosByUser(userId:number):Promise <Todo[]> {
{
  const todos = await this.todoRepository.find({
    where: {
      user: { id: userId },
      completed: false,
    },
  });
  return todos;
}

}
  
 
   }





