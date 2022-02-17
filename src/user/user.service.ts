import { AuthService } from '@app/auth';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(
    private _prisma: PrismaService,
    private _authService: AuthService,
  ){}

  /*
  * REGISTER USER 
  */
 async register(createUserDto: CreateUserDto){
    const { email, password } = createUserDto;
    let user = await this.findByEmaiL(email);
    if(user){
      throw new UnauthorizedException('User registred')
    }
    createUserDto.password = await this._authService.hashPassword(password)
    user =  await this.create(createUserDto);
    const token = await this._authService.createToken(user);
    return {
      statusCode: HttpStatus.ACCEPTED,
      access_token: token,
    }
 }
 
 /*
 * GET ALL UESRS
 */ 
async getAllUsers(): Promise<User[]>{
  return await this._prisma.user.findMany({
    where: {
      deleted_at: null
    }
  });
}


/* 
* GET ALL PUBLIC USERS
*/
async getAllPublicUsers(): Promise<any>{
  return await this._prisma.user.findMany({
    select: {
      name: true,
      email: true,
      deleted_at: true,
    },
    where: {
      deleted_at: null
    }
  })
}

 /* 
 LOGIN USER
 */
async login(LoginUserDto: LoginUserDto){
  const { email, password } = LoginUserDto;
  const user = await this.findByEmaiL(email);
  if(!user || !await this._authService.comparePassword(password, user.password)){
    throw new UnauthorizedException('Wrong Credentials');
  }
  const token = await this._authService.createToken(user);
  return {
    statusCode: HttpStatus.ACCEPTED,
    access_token: token,
  }
}


  /* 
  * CREATE A USER 
  */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, name } = createUserDto
    return await this._prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
  }

  /* 
  * FIND USER BY EMAIL
  */
 async findByEmaiL(email: string): Promise<User>{
   return await this._prisma.user.findUnique({
     where: {
       email
     }
   })
 }

  /* 
  * FIND BY ID 
  */
  async get(id: number): Promise<User>{
    return await this._prisma.user.findUnique({
      where:{
        id
      }
    })
  }

  /* 
  * UPDATE USER
  */
  async update(updateUserDto: UpdateUserDto, user: User): Promise<User>{
    const { email, password, name } = updateUserDto;
    return await this._prisma.user.update({ 
      where: {
        id: user.id
      },
      data: {
        name,
        password,
        email
      }
    });
  }
}
