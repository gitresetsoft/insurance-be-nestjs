import { IsEmail, IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  lastName?: string;

  @IsOptional()
  @IsString()
  @IsIn(['user', 'admin'], { message: 'Role must be either user or admin' })
  role?: 'user' | 'admin';

  @IsOptional()
  @IsString()
  avatar?: string;
}
