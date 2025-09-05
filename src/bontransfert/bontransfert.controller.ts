import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BontransfertService } from './bontransfert.service';
import { CreateBontransfertDto } from './dto/create-bontransfert.dto';
import { UpdateBontransfertDto } from './dto/update-bontransfert.dto';

@Controller('bontransfert')
export class BontransfertController {
  constructor(private readonly bontransfertService: BontransfertService) {}

  @Post()
  create(@Body() createBontransfertDto: CreateBontransfertDto) {
    return this.bontransfertService.create(createBontransfertDto);
  }

  @Get()
  findAll() {
    return this.bontransfertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bontransfertService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBontransfertDto: UpdateBontransfertDto) {
    return this.bontransfertService.update(Number(id), updateBontransfertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bontransfertService.remove(Number(id));
  }
}
