import { Module, ValidationPipe } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './entities/stock.entity';
import { DepotEntity } from 'src/depot/entities/depot.entity';
import { ArticleEntity } from 'src/article/entities/article.entity';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity,DepotEntity,ArticleEntity])],
  controllers: [StockController],
  providers: [StockService,
    {
      provide:APP_PIPE,
      useValue:new ValidationPipe({
        transform:true,
        whitelist:true,
      })
    }
  ],
  exports: [StockService], // 

})
export class StockModule {}
