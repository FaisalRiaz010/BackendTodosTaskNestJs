/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/services/users/users.service';
import { ApiOperation, ApiResponse, ApiTags,ApiBody } from '@nestjs/swagger';


@ApiTags('users') // Adds a tag to the Swagger documentation for this controller
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
//setting for swagger to give parameters
  @Post('register')//use register as a path to post
  @ApiOperation({ summary: 'Register a new user' })//tag the summary
  @ApiBody({ type: User, description: 'User object with username and password' })//Show body
  @ApiResponse({ status: 201, description: 'The user has been successfully registered.', type: User })
  async registerUser(
    @Body() CreateUserDto,
   
  ): Promise<User> {
    return this.usersService.createUser(CreateUserDto);
  }
}
