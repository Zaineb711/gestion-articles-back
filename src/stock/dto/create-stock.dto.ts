import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";



export class CreateStockDto {

    @IsNotEmpty({message:'Quantity is required'})
    @IsNumber()
    @Min(0,{message:'Quantity must be non-negative'})
    qte:number;

    @IsNotEmpty({message:'Quantity minimal  is required'})
    @Min(0,{message:'Quantity minimal must be non-negative'})
    qteminimal:number;

    @IsNotEmpty({message:'Quantity maximal  is required'})
    @Min(0,{message:'Quantity maximal  must be non-negative'})
    qtemaximal:number;


    @IsNotEmpty({message:'depot is required'})
    @IsInt({message:'depotId must be integer'})
    depotId:number;

    @IsNotEmpty({message:'article is required'})
    @IsInt({message:'articleId must be integer'})
    articleId:number;


}
