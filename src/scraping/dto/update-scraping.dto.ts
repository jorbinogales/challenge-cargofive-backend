import { PartialType } from '@nestjs/swagger';
import { CreateScrapingDto } from './create-scraping.dto';

export class UpdateScrapingDto extends PartialType(CreateScrapingDto) {}
