import { IsEmail, IsString, IsOptional, IsIn } from 'class-validator';

export class UserProfileDto {
  @IsString({ message: 'ID is optional' })
  id?: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString({ message: 'First name is required' })
  firstName: string;

  @IsString({ message: 'Last name is required' })
  lastName: string;

  @IsString()
  @IsIn(['user', 'admin'], { message: 'Role must be either user or admin' })
  role: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;

  @IsString()
  @IsOptional()
  avatar?: string | null;
}
