import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { EasyConfiguration } from './configs/easyconfig.service';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { ConfigurationModule } from './configs/configuration.module';
import { AuthModule } from '@app/auth';
import { ScrapingModule } from './scraping/scraping.module';

@Module({
  imports: [
    AuthModule,
    EasyconfigModule.register({
      path: `environment/.env.${process.env.NODE_ENV}`,
      safe: true,
    }),
    ConfigurationModule,
    PrismaModule, 
    UserModule, 
    ArticleModule, 
    CategoryModule, 
    ScrapingModule,
  ],
  providers:[
    EasyConfiguration
  ]
})
export class AppModule {}
