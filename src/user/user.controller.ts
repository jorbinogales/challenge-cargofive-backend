import { Controller, Get, Post, Body, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from '@app/auth/decorator/user.decorator';
import { Role, User } from '@prisma/client';
import { JwtAuthGuard } from '@app/auth/guard/jwtAuth.guard';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { hasRoles } from '@app/auth/decorator/role.decorator';
import { RolesGuard } from '@app/auth/guard/role.guard';

@Controller('user')
@ApiTags('User')
export class UserController {

  constructor(private readonly _userService: UserService) {}

  /*
  * LOGIN A USER
  */
  @Post('login')
  @ApiOperation({ summary: "Login [ ALL ]" })
  async login(@Body() LoginUserDto: LoginUserDto){
    return await this._userService.login(LoginUserDto);
  }

  /*
  * REGISTER A USER
  */
  @Post('register')
  @ApiOperation({ summary: "Register [ ALL ]" })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this._userService.register(createUserDto);
  }
  
  /* 
  * GET PROFILE USER 
  */
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBasicAuth("XYZ")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get Profile Data [ALL]" })
  async profile(@GetUser() user: User): Promise<User>{
    return await this._userService.get(user.id);
  }

  /* 
  * GET ALL USERS BY ADMIN [ONLY ADMIN]
  */
  @Get('')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @hasRoles(Role.ADMIN)
  @ApiBasicAuth("XYZ")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get All Users [ONLY ADMIN]" })
  async listUsersByAdmin(): Promise<User[]>{
    return await this._userService.getAllUsers();
  }


  /* 
  * GET ALL USERS BY USERS [ALL]
  */
  @Get('list')
  @ApiOperation({ summary: "Get All Users [ALL]" })
  async listUserPublic(): Promise<any>{
    return await this._userService.getAllPublicUsers();
  }

  /* 
  * Update User
  */
  @Put('')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @hasRoles(Role.USER, Role.ADMIN)
  @ApiBasicAuth("XYZ")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update User" })
  async update(
    @GetUser() user: User,
    @Body() UpdateUserDto: UpdateUserDto
  ): Promise<User>{
    return await this._userService.update(UpdateUserDto, user);
  }



}
