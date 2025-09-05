import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.create(createArticleDto);
  }

  @Get()
  async findAll() {
    return await this.articleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return await this.articleService.update(Number(id), updateArticleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.articleService.remove(Number(id));
  }
}
