import { PartialType } from '@nestjs/mapped-types';
import { CreateLignebontransfertDto } from './create-lignebontransfert.dto';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateLignebontransfertDto extends PartialType(CreateLignebontransfertDto) {
    @IsOptional()
  @IsInt({ message: "Quantity must be an integer" })
  @Min(1, { message: "Quantity must be at least 1" })
  quantity?: number;

  @IsOptional()
  @IsNumber({}, { message: "Unit price HT must be a number" })
  @Min(0, { message: "Unit price HT must be non-negative" })
  prixUnitaireHT?: number;

  @IsOptional()
  @IsInt({ message: "Article ID must be an integer" })
  articleId?: number;

  @IsOptional()
  @IsInt({ message: "BonTransfert ID must be an integer" })
  bonTransfertId?: number; // Added this line to fix the error
}

