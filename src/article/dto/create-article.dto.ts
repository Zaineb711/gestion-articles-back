import { IsNotEmpty, IsNumber, Min } from "class-validator";



export class CreateArticleDto {
    @IsNotEmpty({message:'designation is required'})
    designation:string;

    @IsNumber({},{message:'Purchase price must be a number'})
    @Min(0,{message :'Purchase price cannot be negative'})
    prixAchatHT:number;

    @IsNumber({},{message:'Sale price must be a number'})
    @Min(0,{message :'Sale price cannot be negative'})
    prixVenteHT:number;


    @IsNotEmpty({message:'Stockable is required'})
    stockable:boolean;

    @IsNotEmpty({ message: 'Reference is required' }) 
    reference: string;

    @IsNotEmpty({message:'TVA ID is required'})
    tvaId:number;

    @IsNotEmpty({message:'famille ID is required'})
    familleId:number;

    @IsNotEmpty({message:'modele ID is required'})
    modeleId:number;

    @IsNotEmpty({message:'marque ID is required'})
    marqueId:number;

    @IsNotEmpty({message:'uniteArticle ID is required'})
    uniteArticleId:number;

}
