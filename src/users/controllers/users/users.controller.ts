/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/services/users/users.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { Todo } from 'src/typeorm/entities/Todo';
import { UpdateUserDto } from 'src/users/dtos/Updateuser.dto';

@ApiTags('users') // Adds a tag to the Swagger documentation for this controller
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //Post the user with username and password + registration method
  @Post('register') //use register as a path to post
  @ApiOperation({ summary: 'Register a new user' }) //tag the summary
  @ApiBody({
    type: User,
    description: 'User object with username and password',
  }) //Show body
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
    type: User,
  })
  async registerUser(
    @Body() CreateUserDto, //using dto fr creation
  ): Promise<User> {
    return this.usersService.createUser(CreateUserDto);
  }

  //update user
  @Put(':id/updateUser')
  @ApiOperation({ summary: 'Forget user Password' }) //in swagger show the Operation what to do
  @ApiBody({ type: User, description: 'Update user password' }) //give the body to type
  @ApiResponse({
    status: 201,
    description: 'The User  has been successfully updated.',
    type: User,
  }) //give response back
  async updateUser(
    @Param('id') id: number,
    @Body() UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, UpdateUserDto.password);
  }
}
