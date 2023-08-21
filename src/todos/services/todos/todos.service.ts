/* eslint-disable prettier/prettier */
import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { CreateTodos } from 'src/todos/dtos/createtodo.dto';
import { Todo } from 'src/typeorm/entities/Todo';
import {  LessThan, MoreThan, Not, Repository } from 'typeorm';
//TypeORM Repository design pattern, each entity has its own Repository. 
//These repositories can be obtained from the database connection

@Injectable()//for injections
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectQueue('todo') private readonly todoQueue: Queue
  ) {}
 
 
//create todo funciton for cretiing the todo by using user id after authentication user can create it
async createTodo(userId: number, createtodo: CreateTodos): Promise<Todo> {
  const todo = this.todoRepository.create({ user: { id: userId }, ...createtodo });
  console.log(todo);

  return this.todoRepository.save(todo);

}
//check for using queue to insert todo using queue and than to db
async insertTodo(userId: number, createtodo: CreateTodos): Promise<Todo> {
  const todocheck = await this.todoRepository.find({where:{user:{id:userId}}});
  if (!todocheck) {
    throw new NotFoundException('User not found');
  }
  const todo = this.todoRepository.create({ user: { id: userId }, ...createtodo });
  return this.todoRepository.save(todo);
}
//login
async loginTodo(userId: number, createtodo: CreateTodos): Promise<Todo> {
  const todo = await this.todoRepository.find({where:{user:{id:userId}}});
  if (!todo) {
    throw new NotFoundException('User not found');
  }
  const todocreate = this.todoRepository.create( {...createtodo} );
  console.log(todocreate);

  return this.todoRepository.save(todocreate);
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
  //delete todo by id 
  async RemoveTodo(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return this.todoRepository.remove(todo);
  }
  
//update totdo title and date 
async updateTodo(id:number,updatetitle:string):Promise<Todo>{
  const existtodo=await this.todoRepository.findOne({ where: { id } });
  console.log(existtodo);
  if(!existtodo)
{
  throw new NotFoundException('todo not FOund');
}
existtodo.title=updatetitle;
console.log(updatetitle);
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

  //get all email
  //email todos finding
  async findTodosWithUserEmails(): Promise<Todo[]> {
    const todos = await this.todoRepository.find({
      relations: ['user'],
      where:{
        user:{
        username:Not(''),
      } ,
  }
})
  
 
 
    return todos;
  }
  
  //OFSET PAGINATION
  async findTodosWithOffset(lastId:number,limit:number):Promise<Todo[]>{
    const todos=await this.todoRepository.find({
      relations:['user'],
      where:{
       
          id:MoreThan(lastId),
        
      },
        take: limit,
        order: {
          id: 'ASC'
        }
       
   
    })
    console.log(todos);
   return todos;
     
  }

      
  
   }





