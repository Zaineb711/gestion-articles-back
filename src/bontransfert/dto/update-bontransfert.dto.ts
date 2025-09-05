import { PartialType } from '@nestjs/mapped-types';
import { CreateBontransfertDto } from './create-bontransfert.dto';

export class UpdateBontransfertDto extends PartialType(CreateBontransfertDto) {}
