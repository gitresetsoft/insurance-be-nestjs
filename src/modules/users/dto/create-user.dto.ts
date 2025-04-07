import { IsEmail, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString({ message: 'First name is required' })
  firstName: string;

  @IsString({ message: 'Last name is required' })
  lastName: string;

  @IsString()
  @IsIn(['user', 'admin'], { message: 'Role must be either user or admin' })
  role: string;

  createdAt?: string;
  updatedAt?: string;
  @IsString()
  @IsOptional()
  avatar?: string;
}
