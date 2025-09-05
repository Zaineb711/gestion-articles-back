import { Module, ValidationPipe } from '@nestjs/common';
import { BontransfertService } from './bontransfert.service';
import { BontransfertController } from './bontransfert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BontransfertEntity } from './entities/bontransfert.entity';
import { DepotEntity } from 'src/depot/entities/depot.entity';
import { LignebontransfertEntity } from 'src/lignebontransfert/entities/lignebontransfert.entity';
import { ArticleEntity } from 'src/article/entities/article.entity';
import { APP_PIPE } from '@nestjs/core';
import { StockEntity } from 'src/stock/entities/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BontransfertEntity,DepotEntity,LignebontransfertEntity,ArticleEntity,StockEntity])],
  controllers: [BontransfertController],
  providers: [BontransfertService,{
    provide:APP_PIPE,
    useValue:new ValidationPipe({
      transform:true,
      whitelist:true,
      validateCustomDecorators:true,
    })
  }],
})
export class BontransfertModule {}
