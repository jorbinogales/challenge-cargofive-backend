import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { NestCrawlerModule } from 'nest-crawler';

@Module({
  imports:[
    NestCrawlerModule
  ],
  providers: [ScrapingService],
  exports: [ScrapingService]
})
export class ScrapingModule {}
