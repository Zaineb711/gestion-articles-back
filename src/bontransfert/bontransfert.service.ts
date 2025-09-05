import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBontransfertDto } from './dto/create-bontransfert.dto';
import { UpdateBontransfertDto } from './dto/update-bontransfert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BontransfertEntity } from './entities/bontransfert.entity';
import { Repository } from 'typeorm';
import { DepotEntity } from 'src/depot/entities/depot.entity';
import { validate } from 'class-validator';
import { LignebontransfertEntity } from 'src/lignebontransfert/entities/lignebontransfert.entity';
import { ArticleEntity } from 'src/article/entities/article.entity';
import { StockEntity } from 'src/stock/entities/stock.entity';
import { classToPlain, plainToInstance } from 'class-transformer';
import { CreateLignebontransfertDto } from 'src/lignebontransfert/dto/create-lignebontransfert.dto';

@Injectable()
export class BontransfertService {
  constructor(
    @InjectRepository(BontransfertEntity) private readonly bonTransfertRepository: Repository<BontransfertEntity>,
    @InjectRepository(DepotEntity) private readonly depotRepository: Repository<DepotEntity>,
    @InjectRepository(LignebontransfertEntity) private readonly ligneBonTransfertRepository: Repository<LignebontransfertEntity>,
    @InjectRepository(ArticleEntity) private readonly articleRpository: Repository<ArticleEntity>,
    @InjectRepository(StockEntity) private readonly stockRepository: Repository<StockEntity>,
  ) {}

  async create(createBontransfertDto: CreateBontransfertDto): Promise<{ bonTransfert: BontransfertEntity; stockUpdates: any[] }> {
    const errors = await validate(createBontransfertDto);
    if (errors.length > 0) {
      const errorMessage = errors.map(error => error.constraints ? Object.values(error.constraints) : ['validation failed']).flat();
      throw new BadRequestException(errorMessage.length > 0 ? errorMessage : ['validation error occurred']);
    }

    if (createBontransfertDto.depotSourceId === createBontransfertDto.depotDestinationId) {
      throw new BadRequestException('source and destination depots cannot be the same');
    }

    const sourceDepot = await this.depotRepository.findOneBy({ id: createBontransfertDto.depotSourceId });
    if (!sourceDepot) throw new NotFoundException(`source depot with id ${createBontransfertDto.depotSourceId} not found`);

    const destinationDepot = await this.depotRepository.findOneBy({ id: createBontransfertDto.depotDestinationId });
    if (!destinationDepot) throw new NotFoundException(`destination depot with id ${createBontransfertDto.depotDestinationId} not found`);

    const ligneEntities = await Promise.all(
      createBontransfertDto.lignes.map(async (ligneDto) => {
        const ligne = plainToInstance(CreateLignebontransfertDto, ligneDto);
        const errors = await validate(ligne);
        if (errors.length > 0) {
          throw new NotFoundException(errors.map(error => error.constraints ? Object.values(error.constraints) : []).flat());
        }

        const article = await this.articleRpository.findOneBy({ id: ligneDto.articleId });
        if (!article) throw new NotFoundException(`Article with id ${ligneDto.articleId} not found`);

        const stock = await this.stockRepository.findOne({
          where: {
            depot: { id: createBontransfertDto.depotSourceId },
            article: { id: ligneDto.articleId }
          }
        });

        if (!stock || stock.qte < ligneDto.quantity) {
          throw new NotFoundException(`Insufficient stock for article ${ligneDto.articleId} in source depot`);
        }

        return this.ligneBonTransfertRepository.create({
          quantity: ligneDto.quantity,
          prixUnitaireHt: ligneDto.prixUnitaireHT,
          article,
        });
      })
    );

    let bonTransfert: BontransfertEntity | null = null;

    await this.bonTransfertRepository.manager.transaction(async (manager) => {
      bonTransfert = manager.create(BontransfertEntity, {
        dateCreation: createBontransfertDto.dateCreation,
        depotSource: sourceDepot,
        depotDestination: destinationDepot,
      });

      bonTransfert = await manager.save(bonTransfert);

      ligneEntities.forEach(ligne => (ligne.bonTransfert = bonTransfert!));
      const savedLignes = await manager.save(ligneEntities);
      bonTransfert.lignes = savedLignes;

      for (const ligne of savedLignes) {
        //   Source stock: decrease qte
        const sourceStock = await manager.findOne(StockEntity, {
          where: {
            depot: { id: createBontransfertDto.depotSourceId },
            article: { id: ligne.article.id }
          }
        });

        if (sourceStock) {
          sourceStock.qte = Number(sourceStock.qte) - Number(ligne.quantity);
          await manager.update(StockEntity, { id: sourceStock.id }, { qte: sourceStock.qte });
        }

        //  Destination stock: increase qte
        let destinationStock = await manager.findOne(StockEntity, {
          where: {
            depot: { id: createBontransfertDto.depotDestinationId },
            article: { id: ligne.article.id }
          }
        });

        if (destinationStock) {
          destinationStock.qte = Number(destinationStock.qte) + Number(ligne.quantity);
          await manager.update(StockEntity, { id: destinationStock.id }, { qte: destinationStock.qte });
        } else {
          const newStock = manager.create(StockEntity, {
            qte: ligne.quantity,
            depot: destinationDepot,
            article: ligne.article,
            qteminimal: 0,
            qtemaximal: 0
          });
          await manager.save(newStock);
        }
      }

      await manager.save(bonTransfert);
    });

    if (!bonTransfert) {
      throw new Error('BonTransfert creation failed unexpectedly');
    }

    const stockResponse = await Promise.all(
      createBontransfertDto.lignes.map(async (ligneDto) => {
        const sourceStock = await this.stockRepository.findOne({
          where: {
            depot: { id: createBontransfertDto.depotSourceId },
            article: { id: ligneDto.articleId }
          },
          relations: ['depot', 'article']
        });

        const destinationStock = await this.stockRepository.findOne({
          where: {
            depot: { id: createBontransfertDto.depotDestinationId },
            article: { id: ligneDto.articleId }
          },
          relations: ['depot', 'article']
        });

        return {
          articleId: ligneDto.articleId,
          sourceDepotId: createBontransfertDto.depotSourceId,
          sourceStockQuantity: sourceStock ? sourceStock.qte : 0,
          destinationDepotId: createBontransfertDto.depotDestinationId,
          destinationStockQuantity: destinationStock ? destinationStock.qte : 0
        };
      })
    );

    (bonTransfert as BontransfertEntity).lignes?.forEach((ligne) => {
      delete (ligne as any).bonTransfert;
    });

    return {
      bonTransfert,
      stockUpdates: stockResponse,
    };
  }

  async findAll(): Promise<BontransfertEntity[]> {
    return await this.bonTransfertRepository.find({
      relations: ['depotSource', 'depotDestination', 'lignes', 'lignes.article']
    });
  }

  async findOne(id: number): Promise<BontransfertEntity> {
    const bonTransfert = await this.bonTransfertRepository.findOne({
      where: { id },
      relations: ['depotSource', 'depotDestination', 'lignes', 'lignes.article']
    });

    if (!bonTransfert) throw new NotFoundException(`BonTransfert with id ${id} not found`);
    return bonTransfert;
  }

  async update(id: number, updateBontransfertDto: UpdateBontransfertDto): Promise<BontransfertEntity> {
    const errors = await validate(updateBontransfertDto);
    if (errors.length > 0) {
      const errorMessages = errors.map(error => error.constraints ? Object.values(error.constraints) : ['validation failed']).flat();
      throw new NotFoundException(errorMessages.length > 0 ? errorMessages : ['validation error occurred']);
    }

    const bonTransfert = await this.findOne(id);

    if (updateBontransfertDto.depotSourceId) {
      const sourceDepot = await this.depotRepository.findOneBy({ id: updateBontransfertDto.depotSourceId });
      if (!sourceDepot) throw new NotFoundException(`source depot with id ${updateBontransfertDto.depotSourceId} not found`);
      bonTransfert.depotSource = sourceDepot;
    }

    if (updateBontransfertDto.depotDestinationId) {
      const destinationDepot = await this.depotRepository.findOneBy({ id: updateBontransfertDto.depotDestinationId });
      if (!destinationDepot) throw new NotFoundException(`destination depot with id ${updateBontransfertDto.depotDestinationId} not found`);
      bonTransfert.depotDestination = destinationDepot;
    }

    if (updateBontransfertDto.dateCreation) {
      bonTransfert.dateCreation = updateBontransfertDto.dateCreation;
    }

    await this.bonTransfertRepository.save(bonTransfert);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const bonTransfert = await this.findOne(id);
    await this.bonTransfertRepository.delete(id);
  }
}
