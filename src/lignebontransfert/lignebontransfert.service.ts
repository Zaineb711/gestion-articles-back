import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLignebontransfertDto } from './dto/create-lignebontransfert.dto';
import { UpdateLignebontransfertDto } from './dto/update-lignebontransfert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LignebontransfertEntity } from './entities/lignebontransfert.entity';
import { Repository } from 'typeorm';
import { BontransfertEntity } from 'src/bontransfert/entities/bontransfert.entity';
import { ArticleEntity } from 'src/article/entities/article.entity';
import { validate } from 'class-validator';


@Injectable()
export class LignebontransfertService {
  constructor(
    @InjectRepository(LignebontransfertEntity)private readonly ligneBonTransfertRepository:Repository<LignebontransfertEntity>,
    @InjectRepository(BontransfertEntity)private readonly BonTransfertRepository:Repository<BontransfertEntity>,
    @InjectRepository(ArticleEntity)private readonly articleRepository:Repository<ArticleEntity>,
  ){}
  async create(createLignebontransfertDto: CreateLignebontransfertDto, bonTransfertId: number): Promise<LignebontransfertEntity> {
  const errors = await validate(createLignebontransfertDto);
  if (errors.length > 0) {
    const errorMessages = errors.map(error => error.constraints ? Object.values(error.constraints) : ['validation failed']).flat();
    throw new BadRequestException(errorMessages.length > 0 ? errorMessages : ['validation error occurred']);
  }

  const article = await this.articleRepository.findOneBy({ id: createLignebontransfertDto.articleId });
  if (!article) throw new NotFoundException(`Article with id ${createLignebontransfertDto.articleId} not found`);

  const bonTransfert = await this.BonTransfertRepository.findOneBy({ id: bonTransfertId });
  if (!bonTransfert) throw new NotFoundException(`BonTransfert with id ${bonTransfertId} not found`);

  const ligne = this.ligneBonTransfertRepository.create({
    quantity: createLignebontransfertDto.quantity,
    prixUnitaireHt: createLignebontransfertDto.prixUnitaireHT, // Fixed typo
    article,
    bonTransfert,
  });
  return await this.ligneBonTransfertRepository.save(ligne);
}

async findAll(): Promise<LignebontransfertEntity[]> {
  return await this.ligneBonTransfertRepository.find({ relations: ['article', 'bonTransfert'] });
}

async findOne(id: number) {
  const ligne = await this.ligneBonTransfertRepository.findOne({ where: { id }, relations: ['article', 'bonTransfert'] });
  if (!ligne) throw new NotFoundException(`LigneBonTransfert with Id #${id} not found`);
  return ligne;
}

async update(id: number, updateLignebontransfertDto: UpdateLignebontransfertDto): Promise<LignebontransfertEntity> {
  const errors = await validate(updateLignebontransfertDto);
  if (errors.length > 0) {
    const errorMessages = errors.map(error => error.constraints ? Object.values(error.constraints) : ['validation failed']).flat();
    throw new BadRequestException(errorMessages.length > 0 ? errorMessages : ['validation error occurred']);
  }

  const ligne = await this.findOne(id);
  if (updateLignebontransfertDto.articleId) {
    const article = await this.articleRepository.findOneBy({ id: updateLignebontransfertDto.articleId });
    if (!article) throw new NotFoundException(`Article with id ${updateLignebontransfertDto.articleId} not found`);
    ligne.article = article;
  }
  if (updateLignebontransfertDto.bonTransfertId) {
    const bonTransfert = await this.BonTransfertRepository.findOneBy({ id: updateLignebontransfertDto.bonTransfertId });
    if (!bonTransfert) throw new NotFoundException(`BonTransfert with id ${updateLignebontransfertDto.bonTransfertId} not found`);
    ligne.bonTransfert = bonTransfert;
  }
  await this.ligneBonTransfertRepository.update(id, {
    quantity: updateLignebontransfertDto.quantity,
    prixUnitaireHt: updateLignebontransfertDto.prixUnitaireHT, // Fixed typo
  });
  return await this.findOne(id);
}

async remove(id: number): Promise<void> {
  const ligne = await this.findOne(id);
  await this.ligneBonTransfertRepository.delete(id);
}
}