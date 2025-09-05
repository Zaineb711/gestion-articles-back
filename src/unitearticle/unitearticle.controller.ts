import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UnitearticleService } from './unitearticle.service';
import { CreateUnitearticleDto } from './dto/create-unitearticle.dto';
import { UpdateUnitearticleDto } from './dto/update-unitearticle.dto';

@Controller('unitearticle')
export class UnitearticleController {
  constructor(private readonly unitearticleService: UnitearticleService) {}

  @Post()
  async create(@Body() createUnitearticleDto: CreateUnitearticleDto) {
    return await  this.unitearticleService.create(createUnitearticleDto);
  }

  @Get()
  async findAll() {
    return await  this.unitearticleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await  this.unitearticleService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUnitearticleDto: UpdateUnitearticleDto) {
    return await this.unitearticleService.update(Number(id), updateUnitearticleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.unitearticleService.remove(Number(id));
  }
}
