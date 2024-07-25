import { Sequelize } from 'sequelize';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

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

export default sequelize;
