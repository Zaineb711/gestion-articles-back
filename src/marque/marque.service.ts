import { Injectable } from '@nestjs/common';
import { CreateMarqueDto } from './dto/create-marque.dto';
import { UpdateMarqueDto } from './dto/update-marque.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MarqueEntity } from './entities/marque.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarqueService {
  constructor(@InjectRepository(MarqueEntity)private readonly marqueRepository:Repository<MarqueEntity>){}
  async create(createMarqueDto: CreateMarqueDto) : Promise<MarqueEntity>{
    const marque=this.marqueRepository.create(createMarqueDto);
    return await this.marqueRepository.save(marque);
  }

  async findAll() : Promise<MarqueEntity[]>{
    return await this.marqueRepository.find();
  }

  async findOne(id: number) : Promise<MarqueEntity | null>{
    return await  this.marqueRepository.findOneBy({id});
  }

  async update(id: number, updateMarqueDto: UpdateMarqueDto) {
    await this.marqueRepository.update(id,updateMarqueDto);

    return await this.marqueRepository.findOneBy({id});
  }

  async remove(id: number) {
    return this.marqueRepository.delete(id);
  }
}
