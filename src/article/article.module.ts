import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { TvaEntity } from 'src/tva/entities/tva.entity';
import { FamilleEntity } from 'src/famille/entities/famille.entity';
import { MarqueEntity } from 'src/marque/entities/marque.entity';
import { ModeleEntity } from 'src/modele/entities/modele.entity';
import { UnitearticleEntity } from 'src/unitearticle/entities/unitearticle.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity,TvaEntity, FamilleEntity, MarqueEntity, ModeleEntity,UnitearticleEntity ])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
