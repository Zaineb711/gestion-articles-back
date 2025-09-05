import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepotDto } from './dto/create-depot.dto';
import { UpdateDepotDto } from './dto/update-depot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepotEntity } from './entities/depot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepotService {
  constructor(@InjectRepository(DepotEntity)private readonly depotRepository: Repository<DepotEntity>){}

  async create(createDepotDto: CreateDepotDto) : Promise<DepotEntity>{
    const depot =this.depotRepository.create(createDepotDto);
    return await this.depotRepository.save(depot);
  }

  async findAll() : Promise<DepotEntity[]>{
    return await this.depotRepository.find();
  }

  async findOne(id: number) : Promise<DepotEntity>{
    const depot=await this.depotRepository.findOne({where:{id},relations:['stocks'],});
    if(!depot) throw new NotFoundException (`depot with id ${id} not found`)
    return depot;
  }

  async update(id: number, updateDepotDto: UpdateDepotDto): Promise<DepotEntity> {
    const depot=await this.findOne(id);
    await this.depotRepository.update(id,updateDepotDto);
    return await this.findOne(id);
  }

  async remove(id: number) : Promise<void>{
    const depot=await this.findOne(id);
    await this.depotRepository.delete(id);
  }
}
