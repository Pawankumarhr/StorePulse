import { IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @MinLength(1)
  @MaxLength(72)
  currentPassword: string;

  @IsString()
  @Length(8, 16)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, {
    message: 'Password must contain at least one uppercase letter and one special character',
  })
  newPassword: string;
}
