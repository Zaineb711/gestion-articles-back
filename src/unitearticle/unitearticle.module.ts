import { Module } from '@nestjs/common';
import { UnitearticleService } from './unitearticle.service';
import { UnitearticleController } from './unitearticle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitearticleEntity } from './entities/unitearticle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnitearticleEntity])],
  controllers: [UnitearticleController],
  providers: [UnitearticleService],
  exports: [UnitearticleService],
})
export class UnitearticleModule {}
