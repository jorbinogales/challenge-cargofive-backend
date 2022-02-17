import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {

    constructor(
        private readonly _primsa: PrismaService
    ){}

    /* 
    * FIND ALL CATEGORY
    */
   async find(): Promise<Category[]>{
       return await this._primsa.category.findMany({
           distinct:['name'],
       })
   }
}
