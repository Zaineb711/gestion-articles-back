import { Injectable } from '@nestjs/common';
import { CreateFamilleDto } from './dto/create-famille.dto';
import { UpdateFamilleDto } from './dto/update-famille.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FamilleEntity } from './entities/famille.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FamilleService {
  constructor(@InjectRepository(FamilleEntity)private readonly familleRepository:Repository<FamilleEntity>){}

  async create(createFamilleDto: CreateFamilleDto) : Promise<FamilleEntity>{
    const famille=this.familleRepository.create(createFamilleDto);

    return await this.familleRepository.save(famille);
  }

  async findAll(): Promise<FamilleEntity[]> {
    return await this.familleRepository.find();
  }

  async findOne(id: number) : Promise<FamilleEntity | null>{
    return await  this.familleRepository.findOneBy({id});
  }

  async update(id: number, updateFamilleDto: UpdateFamilleDto): Promise<FamilleEntity | null> {
    await this.familleRepository.update(id,updateFamilleDto);
    return await this.familleRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
     await this.familleRepository.delete({id}) ;
  }
}
