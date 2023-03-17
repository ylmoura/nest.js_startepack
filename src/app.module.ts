import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StockModule } from './stock/stock.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          host: configService.get('DB_HOST'),
          database: configService.get('DB_DATABASE'),
          port: configService.get('DB_PORT'),
          synchronize: true,
          autoLoadEntities: true,
          ssl: true,
          extra: { ssl: { rejectUnauthorized: true } },
          retryAttempts: 3,
          retryDelay: 5000,
          logging: 'all',
        };
      },
    }),
    ProductModule,
    StockModule,
    PersonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
