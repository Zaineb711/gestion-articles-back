import { IsNotEmpty } from "class-validator";



export class CreateDepotDto {
    @IsNotEmpty({message:'Designation is required'})
    designation:string;

    @IsNotEmpty({message:'adress is required'})
    address:string;
}
