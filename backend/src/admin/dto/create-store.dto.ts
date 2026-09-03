import { IsEmail, IsInt, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  name: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(400)
  address: string;

  @IsInt()
  @Min(1)
  ownerId: number;
}
