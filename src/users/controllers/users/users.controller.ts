/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/services/users/users.service';
import { ApiOperation, ApiResponse, ApiTags,ApiBody } from '@nestjs/swagger';



@ApiTags('users') // Adds a tag to the Swagger documentation for this controller
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
  ) {}
//Post the user with username and password + registration method
  @Post('register')//use register as a path to post
  @ApiOperation({ summary: 'Register a new user' })//tag the summary
  @ApiBody({ type: User, description: 'User object with username and password' })//Show body
  @ApiResponse({ status: 201, description: 'The user has been successfully registered.', type: User })
  async registerUser(
    @Body() CreateUserDto,//using dto fr creation
   
  ): Promise<User> {
    return this.usersService.createUser(CreateUserDto);
  }

  
  //login user
  @Get('userlogin')
  @ApiOperation({summary:'Put Id to get one user'})
  @ApiResponse({ status: 200, description: 'Return todo items.', type: User })
  async loginuser( @Param('userId') userId: number): Promise<User> {
    return this.usersService.loginuser(userId);
}

}


