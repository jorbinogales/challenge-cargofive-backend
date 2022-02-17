import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScrapingService } from 'src/scraping/scraping.service';
import { FilterDto } from './dto/filters.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CategoryInterface } from 'src/category/interface/category.interface';
@Injectable()
export class ArticleService {

  constructor(
    private readonly _scrapingService: ScrapingService,
    private readonly _prisma: PrismaService
    ){}

  /* 
  * SCRAPING ARTICLE FROM BLOG 
  */
  async create(category: string): Promise<Article[]> {
    let articles = [];
    console.log(category);
    if(!category){
      const articlesInternal =  await this._scrapingService.scrape(CategoryInterface.INTERNAL);
      const articlesInnovation =  await this._scrapingService.scrape(CategoryInterface.INNOVATION);
      articles = articles.concat(articlesInternal, articlesInnovation);
    } else { 
      articles =  await this._scrapingService.scrape(category);
    }
    return await this.iterateArticle(articles);
  }

  /* 
  * ITERAR ARTICLE
  */
 async iterateArticle(articles): Promise<Article[]>{
  const newArticles: Article[] = [];
  for(const article of articles){
    console.log(article);
    const exist = await this.findArticleBySource(article.source);
    const { title, description, published_at, source, category, author } = article;
    console.log(exist);
    if(!exist){
      const newArt = await this._prisma.article.create({
        data:{
          title,
          description,
          published_at,
          source,
          author,
          category: {
            create: category
          },
        }
      })
      newArticles.push(newArt);
    }
  }
  return newArticles;
 }

  /* 
  * FIND ARTICLE BY SOURCE 
  */
  async findArticleBySource(source: string): Promise<Article>{
    return await this._prisma.article.findFirst({
      where: {
        source
      }
    })
  }

  /*
  * FIND ARTICLE DATABASE
  */ 
 async findArticle(author: string, category: string): Promise<Article[]>{
   console.log(author);
   console.log(category);
  const articles = await this._prisma.article.findMany({
    where: {
      AND: [
        {
          category: {
            some: {
              name: category,
            },
          }
        },
        {
          author: author
        }
      ]
    },
    include: {
      category: true,
    },
  });
  return articles;
}
}