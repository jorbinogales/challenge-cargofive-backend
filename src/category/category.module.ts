import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
