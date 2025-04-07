import { IsEmail, IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'First name must be a string' })
  @IsOptional()
  firstName?: string;

  @IsString({ message: 'Last name must be a string' })
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsIn(['user', 'admin'], { message: 'Role must be either user or admin' })
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
