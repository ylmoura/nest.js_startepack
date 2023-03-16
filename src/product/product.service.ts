import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { format } from 'util';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}

  async getAllProducts(limit = 100): Promise<ProductEntity[]> {
    this.logger.log(format("Solicitado '%s' produtos.", limit));

    const res: ProductEntity[] = await this.productRepo
      .createQueryBuilder()
      .select(['id', 'name', 'price', 'description'])
      .limit(limit)
      .execute();

    this.logger.log(format("Foi encontrado '%d' produtos.", res.length));

    return res;
  }

  async getProductById(id: number): Promise<ProductEntity> {
    try {
      const res = await this.productRepo.findOne({ where: { id } });
      if (!res) {
        throw new Error(`Entity with id "${id}" not found`);
      }
      return res;
    } catch (error) {
      throw new Error(`Failed to retrieve entity with id "${id}"`);
    }
  }

  async deleteProduct(id: number) {
    return this.productRepo
      .createQueryBuilder()
      .delete()
      .where({ id })
      .execute();
  }
  async updateProduct(id: number, product: UpdateProductDto) {
    this.logger.log(
      format("Pedido de atualização de dados do produto '%s' recebido.", id),
    );
    return this.productRepo
      .createQueryBuilder()
      .update()
      .where({ id })
      .set(product)
      .execute();
  }

  async createProduct(createProductDto: CreateProductDto) {
    const { name, description, price } = createProductDto;

    const product = await this.productRepo.findOneBy({
      name,
      description,
    });
    if (product) {
      // Registro já existe, retorne o registro existente
      return product;
    } else {
      // Registro não existe, crie um novo registro
      const createdProduct = new ProductEntity({ name, description, price });
      const { id, ...clonedCreatedProduct } = Object.assign({}, createdProduct);

      await this.productRepo.save(createdProduct);

      return {
        id: createdProduct.id,
        ...clonedCreatedProduct,
      };
    }
  }
}
