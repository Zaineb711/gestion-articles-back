import { Module } from '@nestjs/common';
import { TvaService } from './tva.service';
import { TvaController } from './tva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvaEntity } from './entities/tva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TvaEntity])],
  controllers: [TvaController],
  providers: [TvaService],
  exports: [TvaService],
})
export class TvaModule {}
