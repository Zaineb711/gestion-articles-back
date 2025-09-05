import { Module } from '@nestjs/common';
import { FamilleService } from './famille.service';
import { FamilleController } from './famille.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilleEntity } from './entities/famille.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FamilleEntity])],
  controllers: [FamilleController],
  providers: [FamilleService],
  exports: [FamilleService],
})
export class FamilleModule {}
