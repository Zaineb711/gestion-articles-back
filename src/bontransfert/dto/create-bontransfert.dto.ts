import { Type } from "class-transformer";
import {  IsArray, IsDate, IsInt, IsNotEmpty } from "class-validator";
import { CreateLignebontransfertDto } from "src/lignebontransfert/dto/create-lignebontransfert.dto";


export class CreateBontransfertDto {


    @IsNotEmpty({message:"creation date is required"})
    @Type(() => Date)
    @IsDate({message:"creation date is required"})
    dateCreation:Date;


    @IsNotEmpty({message:"source depot ID is required"})
    @IsInt({message:"source depot ID must be integer"})
    depotSourceId:number;


    
    @IsNotEmpty({message:"destination depot ID is required"})
    @IsInt({message:"destination depot ID must be integer"})
    depotDestinationId:number;


    @IsArray({message:"lines are required"})
    @IsNotEmpty({message:"lines array cannot be empty"})
    lignes:CreateLignebontransfertDto[];
}
