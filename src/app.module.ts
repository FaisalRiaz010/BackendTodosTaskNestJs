/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Todo } from './typeorm/entities/Todo';
import { TodosModule } from './todos/todos.module';
@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'Todo',
      entities: [User,Todo],
      synchronize:false,
    }), UsersModule, TodosModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
