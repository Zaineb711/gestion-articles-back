import { Module, ValidationPipe } from '@nestjs/common';
import { DepotService } from './depot.service';
import { DepotController } from './depot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepotEntity } from './entities/depot.entity';
import { StockEntity } from 'src/stock/entities/stock.entity';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([DepotEntity,StockEntity])],
  controllers: [DepotController],
  providers: [DepotService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    },
  ],
})
export class DepotModule {}
