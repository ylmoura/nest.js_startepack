import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getConnection } from 'typeorm';

@ValidatorConstraint({ name: 'UniqueValidator', async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [property] = args.constraints;
    const { table, column } = args.constraints[1];
    const sql = `SELECT COUNT(*) FROM ${table} WHERE ${column} = '${value}'`;
    const result = await getConnection().query(sql);
    return result[0].count === 0;
  }

  defaultMessage(args: ValidationArguments) {
    const { table, column } = args.constraints[1];
    return `${column} "${args.value}" is already taken in ${table}`;
  }
}
