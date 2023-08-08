import { Module } from '@nestjs/common';
import { TodosController } from './controllers/todos/todos.controller';
import { TodosService } from './services/todos/todos.service';
import { Todo } from 'src/typeorm/entities/Todo';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
