import { Module } from '@nestjs/common';
import { MarqueService } from './marque.service';
import { MarqueController } from './marque.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarqueEntity } from './entities/marque.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarqueEntity])],
  controllers: [MarqueController],
  providers: [MarqueService],
  exports: [MarqueService],
})
export class MarqueModule {}
