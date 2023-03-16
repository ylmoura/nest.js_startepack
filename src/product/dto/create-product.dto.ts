import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { UniqueValidator } from '../validators/unique.validator';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  id: number;

  @IsString()
  // @Validate(UniqueValidator, ['name'], {
  //   message: 'Username already exists.',
  // })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
