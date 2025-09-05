import { Type } from "class-transformer";
import { IsDecimal, IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";




export class CreateLignebontransfertDto {
    @IsNotEmpty({message:"Quantity is required"})
    @IsInt({message:"Quantity must be integer"})
    @Min(1,{message:"Quantity must be at least 1"})
    quantity:number;


    @IsNotEmpty({message:"Unite price HT is required"})
    @IsNumber({},{message:"Quantity must be integer"})
    @Min(0,{message:"Unite price HT"})
    prixUnitaireHT:number;


    @IsNotEmpty({message:"Article ID is required"})
    @IsInt({message:"Article ID must be integer"})
    articleId:number;

    

}
