import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TvaService } from './tva.service';
import { CreateTvaDto } from './dto/create-tva.dto';
import { UpdateTvaDto } from './dto/update-tva.dto';

@Controller('tva')
export class TvaController {
  constructor(private readonly tvaService: TvaService) {}

  @Post()
  async create(@Body() createTvaDto: CreateTvaDto) {
    return await this.tvaService.create(createTvaDto);
  }

  @Get()
  async findAll() {
    return await this.tvaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tvaService.findOne(Number(id));

  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTvaDto: UpdateTvaDto) {
    return await  this.tvaService.update(Number(id), updateTvaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await  this.tvaService.remove(Number(id));
  }
}
