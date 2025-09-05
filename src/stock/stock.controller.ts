import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  async create(@Body() createStockDto: CreateStockDto) {
    return await this.stockService.create(createStockDto);
  }

  @Get()
  async findAll() {
    return await this.stockService.findAll();
  }

@Get('by-article/:articleId/depot/:depotId')
async getStockForArticleInDepot(
  @Param('articleId') articleId: number,
  @Param('depotId') depotId: number,
) {
  return this.stockService.getStockForArticleInDepot(articleId, depotId);
}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.stockService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(Number(id), updateStockDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await  this.stockService.remove(Number(id));
  }
}
