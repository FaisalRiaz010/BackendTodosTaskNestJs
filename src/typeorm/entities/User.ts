/* eslint-disable prettier/prettier */
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Todo } from './Todo';
@Entity() // Add the @Entity() decorator
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'default_username' }) // Set a default value for username
  username: string;

  @Column()
  password: string;

  //one to many relation that one user can create multiple todos
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
