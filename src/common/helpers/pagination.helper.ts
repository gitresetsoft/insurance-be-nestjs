import { IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

export const createPaginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedResponse<T> => {
  return {
    data,
    meta: {
      total,
      page,
      lastPage: Math.ceil(total / limit),
    },
  };
};
