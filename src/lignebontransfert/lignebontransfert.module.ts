import { Module, ValidationPipe } from '@nestjs/common';
import { LignebontransfertService } from './lignebontransfert.service';
import { LignebontransfertController } from './lignebontransfert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LignebontransfertEntity } from './entities/lignebontransfert.entity';
import { BontransfertEntity } from 'src/bontransfert/entities/bontransfert.entity';
import { ArticleEntity } from 'src/article/entities/article.entity';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([LignebontransfertEntity,BontransfertEntity,ArticleEntity])],
  controllers: [LignebontransfertController],
  providers: [LignebontransfertService,{
    provide:APP_PIPE,
    useValue:new ValidationPipe({
      transform:true,
      whitelist:true,
      validateCustomDecorators:true,
    })
  }],
})
export class LignebontransfertModule {}
