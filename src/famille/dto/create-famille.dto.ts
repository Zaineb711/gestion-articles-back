import { IsNotEmpty } from "class-validator";


export class CreateFamilleDto {
    @IsNotEmpty({message:'Designation is required'})
    designation:string;
}
