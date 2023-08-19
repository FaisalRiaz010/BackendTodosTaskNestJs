/* eslint-disable prettier/prettier */
// todo-queue.service.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateTodos } from './dtos/createtodo.dto';

@Injectable()
export class TodoQueueService {
  constructor(@InjectQueue('todo') private readonly todoQueue: Queue) {}
//function to add the data of todod in queue and than to db
  async addToQueue(todoData: CreateTodos) {
    console.log('Adding item to queue:', todoData);
    await this.todoQueue.add('insertTodo', todoData);
    console.log("completed!");
  }
}
