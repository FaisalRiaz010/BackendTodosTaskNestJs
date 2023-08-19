/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User'; // Import User entity
import { UsersModule } from './users/users.module';
import { Todo } from './typeorm/entities/Todo';
import { TodosModule } from './todos/todos.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'Todo',
      entities: [User, Todo], // Add entities
      migrations: ['migrations/*.ts'],
      extra: {
        authSource: 'mysql_native_password', // Specify the authentication plugin
      },
    }),
    BullModule.registerQueue({
      name: 'todo', // Provide the correct queue name
    }),
    
    UsersModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
 
}
