/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TodosController } from './controllers/todos/todos.controller';
import { TodosService } from './services/todos/todos.service';
import { Todo } from 'src/typeorm/entities/Todo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { TodoQueueService } from './todo-queue.service';
import { TodoProcessor } from './todo.processor';
import { ScheduleModule } from '@nestjs/schedule';
import { TodoCronService } from './todos-cron.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    Repository
    ,TypeOrmModule.forFeature([Todo]) ,
  BullModule.registerQueue({
    name:'todo',
  
  }),
  ScheduleModule.forRoot(),
  
],
  controllers: [TodosController],
  providers: [TodosService,TodoQueueService,TodoProcessor,TodoCronService,EmailService],
})
export class TodosModule {}
