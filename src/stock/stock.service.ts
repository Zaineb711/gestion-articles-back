import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StockEntity } from './entities/stock.entity';
import { Repository } from 'typeorm';
import { DepotEntity } from 'src/depot/entities/depot.entity';
import { ArticleEntity } from 'src/article/entities/article.entity';
import { validate } from 'class-validator';
import { error } from 'console';

@Injectable()
export class StockService {
  constructor(@InjectRepository(StockEntity) private readonly stockRepository:Repository<StockEntity>,
  @InjectRepository(DepotEntity) private readonly depotRepository:Repository<DepotEntity>,
  @InjectRepository(ArticleEntity) private readonly articleRepository:Repository<ArticleEntity>

){}

 async getStockForArticleInDepot(articleId: number, depotId: number) {
  return await this.stockRepository.findOne({
    where: {
      article: { id: articleId },
      depot: { id: depotId },
    },
    relations: ['article', 'depot'],
  });
}

  async create(createStockDto: CreateStockDto): Promise<StockEntity> {
    const errors=await validate(createStockDto);
    if(errors.length>0){
      throw new NotFoundException(errors.map(error=>error.constraints ? Object.values(error.constraints):[]).flat());
    }
    const depot=await this.depotRepository.findOneBy({id:createStockDto.depotId});
    if (!depot) throw new NotFoundException(`depot with id ${createStockDto.depotId} not found`);

    const article=await this.articleRepository.findOneBy({id:createStockDto.articleId});
    if(!article) throw new NotFoundException(`article with id ${createStockDto.articleId} not found `)


    const stock=this.stockRepository.create ({
      qte:createStockDto.qte,
      qteminimal:createStockDto.qteminimal,
      qtemaximal:createStockDto.qtemaximal,
      depot,
      article,
    });
    return await this.stockRepository.save(stock);
  }

  async findAll(): Promise<StockEntity[]> {
    return await this.stockRepository.find({relations:['depot','article']});
  }

  async findOne(id: number): Promise<StockEntity> {
    const stock=await this.stockRepository.findOne({ where :{id},relations:['depot','article']});
    if(!stock) throw new NotFoundException(`stock with id ${id} not found`)
    return stock;
  }

  async update(id: number, updateStockDto: UpdateStockDto): Promise<StockEntity> {

    const errors=await validate(updateStockDto);
    if (errors.length>0){
      throw new NotFoundException(errors.map(error=>error.constraints ?Object.values(error.constraints):[]).flat());
    }
    const stock=await this.findOne(id);

    if (updateStockDto.depotId){
      const article =await this.articleRepository.findOneBy({id:updateStockDto.articleId});
      if (!article) throw new NotFoundException(`Article with id ${updateStockDto.articleId} not found `);
      stock.article=article;
    }
    await this.stockRepository.update(id,{
      qte:updateStockDto.qte,
      qteminimal:updateStockDto.qteminimal,
      qtemaximal:updateStockDto.qtemaximal,
    });
    return await this.findOne(id);

  }

  async remove(id: number): Promise<void> {
    const stock=await this.findOne(id);
    await this.stockRepository.delete(id);
  }
}
