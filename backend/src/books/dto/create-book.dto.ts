import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  Min,
  Max,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateBookDto {
  @ApiProperty({ example: "The Great Gatsby", description: "Book title" })
  @IsString()
  title: string;

  @ApiProperty({ example: "F. Scott Fitzgerald", description: "Book author" })
  @IsString()
  author: string;

  @ApiProperty({ example: "978-0-7432-7356-5", description: "Book ISBN" })
  @IsString()
  isbn: string;

  @ApiProperty({
    example: "A classic American novel",
    description: "Book description",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: "Fiction", description: "Book genre" })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiProperty({ example: 1925, description: "Year of publication" })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1000)
  @Max(2025)
  publishedYear?: number;

  @ApiProperty({ example: "Scribner", description: "Publisher name" })
  @IsOptional()
  @IsString()
  publisher?: string;

  @ApiProperty({
    example: "available",
    description: "Book status",
    enum: ["available", "borrowed", "reserved"],
  })
  @IsOptional()
  @IsEnum(["available", "borrowed", "reserved"])
  status?: "available" | "borrowed" | "reserved";
}
