import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FilterDto {

    @IsString()
    @IsOptional()
    @ApiProperty({ type: "string", description: "author", default: "John Doe"})
    author: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ type: "string", description: "category", default: "Innovation"})
    category: number;

}
