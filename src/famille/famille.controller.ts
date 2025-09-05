import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { FamilleService } from './famille.service';
import { CreateFamilleDto } from './dto/create-famille.dto';
import { UpdateFamilleDto } from './dto/update-famille.dto';

@Controller('famille')
export class FamilleController {
  constructor(private readonly familleService: FamilleService) {}

  @Post()
  async create(@Body() createFamilleDto: CreateFamilleDto) {
    return await  this.familleService.create(createFamilleDto);
  }

  @Get()
  async findAll() {
    return await  this.familleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await  this.familleService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFamilleDto: UpdateFamilleDto) {
    return await  this.familleService.update(Number(id), updateFamilleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await  this.familleService.remove(Number(id));
  }
}
