import { Module } from '@nestjs/common';
import { ModeleService } from './modele.service';
import { ModeleController } from './modele.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeleEntity } from './entities/modele.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModeleEntity])],
  controllers: [ModeleController],
  providers: [ModeleService],
  exports: [ModeleService],
})
export class ModeleModule {}
