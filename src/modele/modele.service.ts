import { Injectable } from '@nestjs/common';
import { CreateModeleDto } from './dto/create-modele.dto';
import { UpdateModeleDto } from './dto/update-modele.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MarqueEntity } from 'src/marque/entities/marque.entity';
import { ModeleEntity } from './entities/modele.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModeleService {
  constructor(@InjectRepository(ModeleEntity)private readonly modeleRepository:Repository<ModeleEntity>){}

  async create(createModeleDto: CreateModeleDto): Promise<ModeleEntity> {
    const modele=this.modeleRepository.create(createModeleDto);
    return await this.modeleRepository.save(modele);
  }

  async findAll(): Promise<ModeleEntity[]> {
    return await this.modeleRepository.find() ;
  }

  async findOne(id: number) : Promise<ModeleEntity | null>{
    return await  this.modeleRepository.findOneBy({id});
  }

  async update(id: number, updateModeleDto: UpdateModeleDto): Promise<ModeleEntity | null> {
    await this.modeleRepository.update(id,updateModeleDto);
    return await this.modeleRepository.findOneBy({id}) ;
  }

  async remove(id: number) : Promise<void>{
    await  this.modeleRepository.delete(id);
  }
}
