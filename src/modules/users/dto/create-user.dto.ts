import { IsEmail, IsString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsString({ message: 'First name is required' })
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsString({ message: 'Last name is required' })
  lastName: string;

  @ApiProperty({
    description: 'User role',
    enum: ['user', 'admin'],
    example: 'user',
  })
  @IsString()
  @IsIn(['user', 'admin'], { message: 'Role must be either user or admin' })
  role: 'user' | 'admin';

  @ApiProperty({
    description: 'User avatar URL',
    example: 'https://example.com/avatars/john-doe.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatar?: string;
}
