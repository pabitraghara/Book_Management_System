import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "john_doe", description: "Unique username" })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    example: "john@example.com",
    description: "User email address",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "password123",
    description: "User password (minimum 6 characters)",
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "John", description: "User first name" })
  @IsString()
  firstName: string;

  @ApiProperty({ example: "Doe", description: "User last name" })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: "user",
    description: "User role",
    enum: ["user", "admin"],
  })
  @IsOptional()
  @IsEnum(["user", "admin"])
  role?: "user" | "admin";
}
