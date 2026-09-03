import { IsEmail, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  name: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @Length(8, 16)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, {
    message: 'Password must contain at least one uppercase letter and one special character',
  })
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(400)
  address: string;
}
