/* eslint-disable prettier/prettier */
// todos-cron.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TodosService } from './services/todos/todos.service';
import { EmailService } from '../email/email.service'; // Import your EmailService

@Injectable()
export class TodoCronService {
  constructor(
    private readonly todosService: TodosService,
    private readonly emailService: EmailService, // Inject the EmailService
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async sendScheduledEmails() {
    const todos = await this.todosService.findUsersWithTodosAndEmails();
  
     for (const todo of todos) {
      if (todo.user && todo.user.username ) {
        //&& !todo.completed use login when need
        const subject = 'Todo Reminder!!';
        const text = `Please Don't forget to complete your todo: ${todo.title}`;
  
        await this.emailService.sendEmail(todo.user.username, subject, text);
  
        
      
  
        console.log(`Email sent to ${todo.user.username}`);
      }
    }
  }
  
  
}
