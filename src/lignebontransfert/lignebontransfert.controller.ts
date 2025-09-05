import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LignebontransfertService } from './lignebontransfert.service';
import { CreateLignebontransfertDto } from './dto/create-lignebontransfert.dto';
import { UpdateLignebontransfertDto } from './dto/update-lignebontransfert.dto';

@Controller('lignebontransfert')
export class LignebontransfertController {
  constructor(private readonly lignebontransfertService: LignebontransfertService) {}

  @Post()
  create(@Body() createLignebontransfertDto: CreateLignebontransfertDto,@Param('bonTransfertId') bonTransfertId: string) {
    return this.lignebontransfertService.create(createLignebontransfertDto,+bonTransfertId);
  }

  @Get()
  async findAll() {
    return await this.lignebontransfertService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await  this.lignebontransfertService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLignebontransfertDto: UpdateLignebontransfertDto) {
    return await  this.lignebontransfertService.update(Number(id), updateLignebontransfertDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await  this.lignebontransfertService.remove(Number(id));
  }
}
