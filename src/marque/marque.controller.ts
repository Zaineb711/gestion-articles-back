import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MarqueService } from './marque.service';
import { CreateMarqueDto } from './dto/create-marque.dto';
import { UpdateMarqueDto } from './dto/update-marque.dto';

@Controller('marque')
export class MarqueController {
  constructor(private readonly marqueService: MarqueService) {}

  @Post()
  async create(@Body() createMarqueDto: CreateMarqueDto) {
    return await this.marqueService.create(createMarqueDto);
  }

  @Get()
  async findAll() {
    return await this.marqueService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.marqueService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMarqueDto: UpdateMarqueDto) {
    return await  this.marqueService.update(Number(id), updateMarqueDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.marqueService.remove(Number(id));
  }
}
