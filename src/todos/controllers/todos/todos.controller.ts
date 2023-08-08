/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from 'src/todos/services/todos/todos.service';
import { Todo } from 'src/typeorm/entities/Todo';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';

// FOr swagger setup follow the link
//https://github.com/nestjs/nest/blob/master/sample/11-swagger/src/cats/cats.controller.ts

@ApiTags('todos') // Adds a tag to the Swagger  for this controller
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}//create constructor

  @Post('addtodo')//post addtodo like /todos/addtodo
  @ApiOperation({ summary: 'Create a new todo item' })//in swagger show the Operation what to do
  @ApiBody({ type: Todo, description: 'Todo object with title and userId' })//give the body to type
  @ApiResponse({ status: 201, description: 'The todo item has been successfully created.', type: Todo })//give response back
  async createTodo(
    @Body()CreateTodos,
  ): Promise<Todo> {
    return this.todosService.createTodo(CreateTodos);
  }
//for check completed todos
//use patch beacuse we just partially update the todo not fully if want fully than we use put
  @Patch(':id/complete')
  @ApiOperation({ summary: 'Mark a todo item as completed' })
  @ApiParam({ name: 'id', description: 'Todo item ID', type: 'number' })//give id of the added todo as a parameter
  @ApiResponse({ status: 200, description: 'The todo item has been marked as completed.', type: Todo })
  async markTodoAsCompleted(@Param('id') id: number): Promise<Todo> {
    return this.todosService.markTodoAsCompleted(id);
  }

  //get all the todos add by specific user
  @Get(':id/todos')
  @ApiOperation({summary:'Put Id to get all todos'})
  @ApiResponse({ status: 200, description: 'Return todo items.', type: [Todo] })
  async getallTodosByUser(@Param('id') userId: number): Promise<Todo[]> {
    return this.todosService.getallTodosByUser(userId);
}
//delete the todo getting by id 
@Delete(':id/delete')
  @ApiOperation({ summary: 'Delete Todo' })
  @ApiParam({ name: 'id', description: 'Todo item ID', type: 'number' })//give id of the added todo as a parameter
  @ApiResponse({ status: 200, description: 'The todo item has been Deleted Successfully.', type: Todo })
  async RemoveTodo(@Param('id') id: number): Promise<Todo> {
    return this.todosService.RemoveTodo(id);
  }
//get the task of todos accomplished by specific users 

}
