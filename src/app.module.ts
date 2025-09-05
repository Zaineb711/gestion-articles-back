import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'db/data-source';
import { ArticleModule } from './article/article.module';
import { DepotModule } from './depot/depot.module';
//import { StockModule } from './stock/stock.module';
import { StockModule } from './stock/stock.module';
import { BontransfertModule } from './bontransfert/bontransfert.module';
import { LignebontransfertModule } from './lignebontransfert/lignebontransfert.module';
import { TvaModule } from './tva/tva.module';
import { FamilleModule } from './famille/famille.module';
import { MarqueModule } from './marque/marque.module';
import { ModeleModule } from './modele/modele.module';
import { UnitearticleModule } from './unitearticle/unitearticle.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOption), ArticleModule, DepotModule, StockModule, BontransfertModule, LignebontransfertModule, TvaModule, FamilleModule, MarqueModule, ModeleModule, UnitearticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
