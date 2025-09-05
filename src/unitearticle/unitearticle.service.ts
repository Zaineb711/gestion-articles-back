import { Injectable } from '@nestjs/common';
import { CreateUnitearticleDto } from './dto/create-unitearticle.dto';
import { UpdateUnitearticleDto } from './dto/update-unitearticle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitearticleEntity } from './entities/unitearticle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnitearticleService {
  constructor(@InjectRepository(UnitearticleEntity)private readonly uniteArticleRepository :Repository<UnitearticleEntity>){}

  async create(createUnitearticleDto: CreateUnitearticleDto): Promise<UnitearticleEntity> {
    const uniteArticle=this.uniteArticleRepository.create(createUnitearticleDto);

    return await this.uniteArticleRepository.save(uniteArticle);
  }

  async findAll(): Promise<UnitearticleEntity[]> {
    return await this.uniteArticleRepository.find();
  }

  async findOne(id: number) : Promise<UnitearticleEntity | null>{
    return await this.uniteArticleRepository.findOneBy({id});
  }

  async update(id: number, updateUnitearticleDto: UpdateUnitearticleDto) : Promise<UnitearticleEntity | null>{
    await this.uniteArticleRepository.update(id,updateUnitearticleDto);
    return await this.uniteArticleRepository.findOneBy({id});
  }

  async remove(id: number) : Promise<void>{
    await this.uniteArticleRepository.delete(id);
  }
}
