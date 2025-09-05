import { PartialType } from '@nestjs/mapped-types';
import { CreateUnitearticleDto } from './create-unitearticle.dto';

export class UpdateUnitearticleDto extends PartialType(CreateUnitearticleDto) {}
