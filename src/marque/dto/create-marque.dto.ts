import { IsNotEmpty } from "class-validator";



export class CreateMarqueDto {
    @IsNotEmpty({message:'designation is required'})
    designation:string;
}
