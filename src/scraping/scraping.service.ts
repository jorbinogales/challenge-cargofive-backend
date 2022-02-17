import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { NestCrawlerService } from 'nest-crawler';

const scrapeIt = require("scrape-it")

@Injectable()
export class ScrapingService {
  constructor(
    private readonly crawler: NestCrawlerService,
  ){}

  /* 
  SCRAP LINKS OF ARTICLE 
  */
   public async getLinks(category: string): Promise<string[]> {

    const links: string[] = [];
      await scrapeIt(`https://cargofive.com/category/${category}`, {
        articles: {
            listItem: "article.post", 
            data: {
                /*
                * LINK DEL POST
                */
               link: {
                 selector: '.entire-meta-link',
                 attr: 'href',
               },
          }
        }
    }, (err, {data}) => {
        data.articles.map((article:any, index: number) =>{
          if(index < 3){
            links.push(article);
          }
        })
    })

    return links;
  }

  /* 
  * SCRAPE EACH ARTICLE
  */
  public async scrape(category: string): Promise<any[]>{
      const links = await this.getLinks(category);
      const articles: Article[] = [];
      for(const x of links){
          await scrapeIt(`${x.link}`, {
              /*  TITLE */
              title: {
                selector: 'h1.entry-title'
              },

              /* DESCRIPTION */
              description:{
                selector: '.content-inner > h2'
              },

              /* PUBLISHED_AT */
              published_at: {
                selector: '.meta-date',
                convert: x => new Date(x)
              },

              /* CATEGORY */
              category: {
                 listItem: '#single-below-header > .meta-category > a',
              },

              /* AUTHOR */
              author: {
                selector: '.fn > a',
             },

        }, (err, {data}) => {
          data.source = x.link;
          data.category = data.category.map((category: string) => { return { name: category}});
          articles.push(data);
        })
      }
      return articles;
  }

  
}
