import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ModeleService } from './modele.service';
import { CreateModeleDto } from './dto/create-modele.dto';
import { UpdateModeleDto } from './dto/update-modele.dto';

@Controller('modele')
export class ModeleController {
  constructor(private readonly modeleService: ModeleService) {}

  @Post()
  async create(@Body() createModeleDto: CreateModeleDto) {
    return await  this.modeleService.create(createModeleDto);
  }

  @Get()
  async findAll() {
    return await  this.modeleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await  this.modeleService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateModeleDto: UpdateModeleDto) {
    return await this.modeleService.update(Number(id), updateModeleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await  this.modeleService.remove(Number(id));
  }
}
