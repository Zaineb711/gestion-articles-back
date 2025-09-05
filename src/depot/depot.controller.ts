import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DepotService } from './depot.service';
import { CreateDepotDto } from './dto/create-depot.dto';
import { UpdateDepotDto } from './dto/update-depot.dto';

@Controller('depot')
export class DepotController {
  constructor(private readonly depotService: DepotService) {}

  @Post()
  async create(@Body() createDepotDto: CreateDepotDto) {
    return await this.depotService.create(createDepotDto);
  }

  @Get()
  async findAll() {
    return await  this.depotService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.depotService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDepotDto: UpdateDepotDto) {
    return await this.depotService.update(Number(id), updateDepotDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await  this.depotService.remove(Number(id));
  }
}
