import { IsNotEmpty, IsNumber, Min } from "class-validator";


export class CreateTvaDto {
    @IsNotEmpty({ message: 'Tax rate is required' })
    @IsNumber({}, { message: 'Tax must be a number' })
    @Min(0, { message: 'Tax cannot be negative' })
    tax: number;
}
