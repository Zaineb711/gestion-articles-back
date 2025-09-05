import { PartialType } from '@nestjs/mapped-types';
import { CreateTvaDto } from './create-tva.dto';

export class UpdateTvaDto extends PartialType(CreateTvaDto) {}
