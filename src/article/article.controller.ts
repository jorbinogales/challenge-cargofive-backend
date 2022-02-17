import { hasRoles } from '@app/auth/decorator/role.decorator';
import { JwtAuthGuard } from '@app/auth/guard/jwtAuth.guard';
import { RolesGuard } from '@app/auth/guard/role.guard';
import { Controller, UseGuards, Post, Query } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { ArticleService } from './article.service';

@Controller('article')
@ApiTags('Article')
export class ArticleController {


  constructor(private readonly articleService: ArticleService) {}

  /* 
  * GET CATEGORY FROM DATABASE
  */
 @Post('')
 @UseGuards(RolesGuard)
 @UseGuards(JwtAuthGuard)
 @hasRoles(Role.USER)
 @ApiBasicAuth("XYZ")
 @ApiBearerAuth()
  async find(
    @Query('author') author?: string,
    @Query('category') category?: string,
  ) {
    return await this.articleService.findArticle(author, category);
  }

  /* 
  * SCRAPING ARTICLES FROM BLOG 
  */
  @Post('scrap')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @hasRoles(Role.USER)
  @ApiBasicAuth("XYZ")
  @ApiBearerAuth()
  async create(
    @Query('category') category?: string 
  ) {
  return await this.articleService.create(category);
  }




}
