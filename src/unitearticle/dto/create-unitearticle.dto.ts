import { IsNotEmpty } from "class-validator";



export class CreateUnitearticleDto {

    @IsNotEmpty({message:"libelle is required"})
    libelle:string;
}
