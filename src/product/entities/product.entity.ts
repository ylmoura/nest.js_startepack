import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Product')
export class ProductEntity {
  constructor(productData?: Omit<ProductEntity, 'id'>) {
    Object.assign(this, productData);
  }

  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public price: number;
}
