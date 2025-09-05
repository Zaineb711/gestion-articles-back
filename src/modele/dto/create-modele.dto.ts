import { IsNotEmpty } from "class-validator";


export class CreateModeleDto {

    @IsNotEmpty({message:'designation is required'})
    designation:string;
}
