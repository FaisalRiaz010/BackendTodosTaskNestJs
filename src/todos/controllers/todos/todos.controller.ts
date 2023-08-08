/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from 'src/todos/services/todos/todos.service';
import { Todo } from 'src/typeorm/entities/Todo';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { CreateTodos } from 'src/todos/dtos/createtodo.dto';

@ApiTags('todos') // Adds a tag to the Swagger  for this controller
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}//create constructor

  @Post('addtodo')//post addtodo like /todos/addtodo
  @ApiOperation({ summary: 'Create a new todo item' })//in swagger show the Operation what to do
  @ApiBody({ type: Todo, description: 'Todo object with title and userId' })//give the body to type
  @ApiResponse({ status: 201, description: 'The todo item has been successfully created.', type: Todo })//give response back
  async createTodo(
    @Body()CreateTodos,//user id is the id of the user that want to create todo
  ): Promise<Todo> {
    return this.todosService.createTodo(CreateTodos);
  }
//for check complete
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

//get the task of todos accomplished by specific users 

}
