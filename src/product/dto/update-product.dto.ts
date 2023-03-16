import { IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  id: number;

  @IsString()
  name: string;

  @IsString()
  price: number;

  @IsString()
  description: string;
}
