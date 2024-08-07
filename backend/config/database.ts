// src/config/database.ts
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env); // Debugging to ensure environment variables are loaded

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

export { sequelize };
export default sequelize;
