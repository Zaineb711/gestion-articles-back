import { Injectable } from '@nestjs/common';
import { CreateTvaDto } from './dto/create-tva.dto';
import { UpdateTvaDto } from './dto/update-tva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TvaEntity } from './entities/tva.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class TvaService {
  constructor(@InjectRepository(TvaEntity)private readonly tvaRepository :Repository<TvaEntity>){}

  async create(createTvaDto: CreateTvaDto) : Promise<TvaEntity>{
    const tva= this.tvaRepository.create(createTvaDto)
    return  await this.tvaRepository.save(tva);
  }

  async findAll() : Promise<TvaEntity[]>{
    return await this.tvaRepository.find();
  }

  async findOne(id: number) : Promise<TvaEntity | null>{
    return await this.tvaRepository.findOneBy({id});
  }

  async update(id: number, updateTvaDto: UpdateTvaDto): Promise<TvaEntity | null> {
    await this.tvaRepository.update(id,updateTvaDto);
    return await this.tvaRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    await  this.tvaRepository.delete(id);
  }
}
